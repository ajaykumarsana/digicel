import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UserService, CmsService, GroupService, AdminService } from 'services';
import { PasswordComponent, HiComponent, AudioModalComponent, BehaviorComponent, DirectCallComponent,
  DepartmentsComponent, OnboardingAdminList, OnboardingUserList, PhoneMenuModalComponent, SimRingComponent } from '../../shared-components';
import { IModal } from 'interfaces';

@Component({
  selector: 'app-ftue',
  templateUrl: './ftue.component.html',
  styleUrls: ['./ftue.component.scss']
})
export class FtueComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  private adminModals: OnboardingAdminList;
  private userModals: OnboardingUserList;
  private admin: boolean;
  autoAttendantOverride = false;
  modalIndex = 0;
  modalSequence: IModal[] = [];
  modalSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public cms: CmsService,
    private groupService: GroupService,
    private userService: UserService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.runModalChecks();
  }

  runModalChecks() {
    this.admin = this.userService.isAdmin();
    this.autoAttendantOverride = this.groupService.aaOverride;

    if (this.admin) {
      this.adminModals = {
        voiceMail: this.groupService.isVoicemailSet,
        behavior: this.groupService.isBehaviorSet,
        autoAttendant: this.groupService.isAutoAttendantSet,
        huntGroups: this.groupService.isHuntGroupSet,
        phoneMenu: this.groupService.isPhoneMenuSet,
        receptionist: this.groupService.isReceptionistSet
      };
    }

    this.userModals = {
      simRing: this.userService.getIsSimRingSet(),
      voiceMail: this.userService.getIsUserVMGreetingSet(),
      validPassword: !this.userService.getIsPasswordExpired()
    };

    if (this.shouldAdminModalsBeShown() || this.shouldUserModalsBeShown()) {
      this.addModalsToSequence();
      // If not showing any modals, exit
    } else {
      this.exitFTUE();
    }
  }

  ngAfterViewInit() {
    // For some reason setTimeout suppresses an error
    setTimeout(() => this.launchCurrentModal(), 0);
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    // Exit on Esc key unless on password change page (biz req: cannot exit out of password change)
    if (event.keyCode === 27 && this.currentModal().component !== PasswordComponent) {
      this.exitFTUE();
    }
  }

  addModalsToSequence() {
    const showAdminModals = this.shouldAdminModalsBeShown();
    const showUserModals = this.shouldUserModalsBeShown();

    // Add admin modals as needed
    if (showAdminModals) {
      // Intro modal
      if (!this.autoAttendantOverride) {
        this.modalSequence.push({ component: HiComponent, data: { admin: true, adminComplete: false, useModals: true } });
      }
      // If behavior has been selected, add in any relevant behavior-specifc modals
      if (this.adminModals.behavior) {
        this.modalSequence.push(...this.behaviorSpecificModals());
        // If behavior has not been selected, show the behavior selection modal
        // Note: behavior-specific modals will be spliced into the modal sequence via the spliceInBehaviorSpecificModals() method
      } else {
        this.modalSequence.push({ component: BehaviorComponent, data: { useModals: true } });
      }
      if (!this.adminModals.voiceMail) {
        this.modalSequence.push({ component: AudioModalComponent, data: { audioType: 'voicemail', useModals: true } });
      }
    }

    // Add user modals as needed
    if (showUserModals) {
      // Intro modal
      if (!this.autoAttendantOverride) {
        this.modalSequence.push({ component: HiComponent,
          data: { admin: this.admin, adminComplete: true, userComplete: false, useModals: true } });
      }
      if (!this.userModals.simRing) {
        this.modalSequence.push({ component: SimRingComponent, data: { useModals: true } });
      }
      if (!this.userModals.voiceMail) {
        this.modalSequence.push({ component: AudioModalComponent, data: { audioType: 'userVoicemail', useModals: true } });
      }
      if (!this.userModals.validPassword) {
        // Password change should come first -- even before welcome page
        this.modalSequence.unshift({ component: PasswordComponent, data: { isFTUE: true, isOnboarding: false } });
      }
    }

    // If password change is only FTUE modal, remove the "HiComponent"
    if (this.modalSequence.length === 2 && this.modalSequence[0].component === PasswordComponent) {
      this.modalSequence.pop();
    } else {
      // Add confirmation modal to end
      if (!this.autoAttendantOverride) {
        this.modalSequence.push({ component: HiComponent,
          data: { admin: this.admin, adminComplete: true, userComplete: true, useModals: true } });
      }
    }
  }

  currentModal(): IModal {
    return this.modalSequence[this.modalIndex];
  }

  showPreviousModal(): void {
    // Do not rewind past 0
    if (this.modalIndex > 0) {
      this.modalIndex--;
    }
    this.launchCurrentModal();
  }

  showNextModal(): void {
    // If the user just selected a Behavior, insert the behavior-specific modals into the modal sequence
    const currentModal = this.currentModal();
    if (currentModal && currentModal.component === BehaviorComponent) {
      this.spliceInBehaviorSpecificModals();
    }

    this.modalIndex++;
    this.launchCurrentModal();
  }

  handleModalResult(result: string) {
    this.modalSubscription.unsubscribe();
    switch (result) {
      case undefined:
        break;
      case 'back':
        this.showPreviousModal();
        break;
      case 'skip':
        this.exitFTUE();
        break;
      case 'success':
      default:
        this.showNextModal();
    }
  }

  launchCurrentModal(): void {
    // Exit if no modals left
    if (!this.currentModal()) {
      this.exitFTUE();
      return;
    }

    const modalComponent = this.currentModal().component;
    const data = this.currentModal().data || {};
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalComponent as any);

    this.viewContainer.clear();
    const componentRef = this.viewContainer.createComponent(componentFactory);
    const componentInstance = componentRef.instance;

    for (let [key, value] of Object.entries(data)) {
      componentInstance[key] = value;
    }
    this.modalSubscription = componentInstance['result'].subscribe(result => this.handleModalResult(result));
  }

  behaviorSpecificModals(): IModal[] {
    const modals = [];
    const behavior = this.groupService.group.behavior;
    if (behavior === 'autoAttendant' && !this.adminModals.huntGroups) {
      modals.push({ component: DepartmentsComponent, data: { useModals: true } });
    }
    if (behavior === 'autoAttendant' && !this.adminModals.phoneMenu) {
      modals.push({ component: PhoneMenuModalComponent, data: { useModals: true } });
    }
    if (behavior === 'autoAttendant' && !this.adminModals.autoAttendant) {
      modals.push({ component: AudioModalComponent, data: { audioType: 'autoAttendant', useModals: true } });
    }
    if (behavior === 'receptionist' && !this.adminModals.receptionist) {
      modals.push({ component: DirectCallComponent, data: { useModals: true } });
    }
    return modals;
  }

  // Call this method when after the user selects a behavior
  // It will insert the behavior-specific modals into the modal sequence
  spliceInBehaviorSpecificModals(): void {
    this.modalSequence.splice(this.modalIndex + 1, 0, ...this.behaviorSpecificModals());
  }

  shouldAdminModalsBeShown(): boolean {
    return ((this.admin && (!this.adminModals.voiceMail || !this.adminModals.behavior)) || (this.autoAttendantOverride)) ;
  }

  shouldUserModalsBeShown(): boolean {
    return !this.userModals.simRing || !this.userModals.voiceMail || !this.userModals.validPassword;
  }

  exitFTUE() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    // For some reason the setTimeout suppresses an ExpressionChangedAfterItHasBeenCheckedError error
    setTimeout(() => {
      this.adminService.showFTUE = false;
    }, 0);
  }

}
