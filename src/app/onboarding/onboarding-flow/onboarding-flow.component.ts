import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UserService, CmsService, GroupService, AdminService } from 'services';
import { PasswordComponent, HiComponent, AudioModalComponent, BehaviorComponent, DirectCallComponent,
         DepartmentsComponent, OnboardingAdminList, OnboardingUserList,
         PhoneMenuModalComponent, SimRingComponent } from '../../shared-components';
import { IModal } from 'interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-flow',
  templateUrl: './onboarding-flow.component.html',
  styleUrls: ['./onboarding-flow.component.scss']
})
export class OnboardingFlowComponent implements OnInit, AfterViewInit {
  @ViewChild('onboardingContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  private adminOnboardingComponents: OnboardingAdminList;
  private userOnboardingComponents: OnboardingUserList;
  private admin: boolean;
  autoAttendantOverride = false;
  onboardingIndex = 0;
  onboardingSequence: IModal[] = [];
  onboardingSubscription: Subscription;

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    public cms: CmsService,
    private groupService: GroupService,
    private userService: UserService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.runOnboardingChecks();
  }

  runOnboardingChecks() {
    this.admin = this.userService.isAdmin();
    this.autoAttendantOverride = this.groupService.aaOverride;

    if (this.admin) {
      this.adminOnboardingComponents = {
        voiceMail: this.groupService.isVoicemailSet,
        behavior: this.groupService.isBehaviorSet,
        autoAttendant: this.groupService.isAutoAttendantSet,
        huntGroups: this.groupService.isHuntGroupSet,
        phoneMenu: this.groupService.isPhoneMenuSet,
        receptionist: this.groupService.isReceptionistSet
      };
    }

    if (!this.cms.getFromProvider('onboardingUserComponentsEneabled')) {
      this.userOnboardingComponents = {
        simRing: true,
        voiceMail: true,
        validPassword: true
      };
    } else {
      this.userOnboardingComponents = {
        simRing: this.userService.getIsSimRingSet(),
        voiceMail: this.userService.getIsUserVMGreetingSet(),
        validPassword: !this.userService.getIsPasswordExpired()
      };
    }

    if (this.shouldadminOnboardingComponentsBeShown() || this.shoulduserOnboardingComponentsBeShown()) {
      this.addOnboardingComponentsToSequence();
      // If not showing any Onboarding, exit
    } else {
      this.exitOnboarding();
    }
  }

  ngAfterViewInit() {
    // For some reason setTimeout suppresses an error
    setTimeout(() => this.launchCurrentOnboardingComponent(), 0);
  }

  @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
    // Exit on Esc key unless on password change page (biz req: cannot exit out of password change)
    if (event.keyCode === 27 && this.currentOnboardingComponent().component !== PasswordComponent) {
      this.exitOnboarding();
    }
  }

  addOnboardingComponentsToSequence() {
    const showadminOnboardingComponents = this.shouldadminOnboardingComponentsBeShown();
    const showuserOnboardingComponents = this.shoulduserOnboardingComponentsBeShown();

    // Add admin Onboarding Components as needed
    if (showadminOnboardingComponents) {
      // Intro Onboarding Component
      if (!this.autoAttendantOverride) {
        this.onboardingSequence.push({ component: HiComponent, data: { admin: true, adminComplete: false, useModals: false } });
      }
      // If behavior has been selected, add in any relevant behavior-specifc Onboarding Components
      if (this.adminOnboardingComponents.behavior) {
        this.onboardingSequence.push(...this.behaviorSpecificOnboardingComponents());
        // If behavior has not been selected, show the behavior selection Onboarding Component
        // Note: behavior-specific Onboarding Components will be spliced
        // into the Onboarding Component sequence via the spliceInBehaviorSpecificOnboardingComponents() method
      } else {
        this.onboardingSequence.push({ component: BehaviorComponent, data: { useModals: false } });
      }
      if (!this.adminOnboardingComponents.voiceMail) {
        this.onboardingSequence.push({ component: AudioModalComponent, data: { audioType: 'voicemail', useModals: false } });
      }
    }

    // Add user onboarding components as needed
    if (showuserOnboardingComponents) {
      // Intro onboarding component
      if (!this.autoAttendantOverride) {
        this.onboardingSequence.push({ component: HiComponent,
          data: { admin: this.admin, adminComplete: true, userComplete: false, useModals: false } });
      }
      if (!this.userOnboardingComponents.simRing) {
        this.onboardingSequence.push({ component: SimRingComponent, data: { useModals: false } });
      }
      if (!this.userOnboardingComponents.voiceMail) {
        this.onboardingSequence.push({ component: AudioModalComponent, data: { audioType: 'userVoicemail', useModals: false } });
      }
      if (!this.userOnboardingComponents.validPassword) {
        // Password change should come first -- even before welcome page
        this.onboardingSequence.unshift({ component: PasswordComponent, data: { isFTUE: false, isOnboarding: true } });
      }
    }

    // If password change is only Onboarding component, remove the "HiComponent"
    if (this.onboardingSequence.length === 2 && this.onboardingSequence[0].component === PasswordComponent) {
      this.onboardingSequence.pop();
    } else {
      // Add confirmation onboarding component to end
      if (!this.autoAttendantOverride) {
        this.onboardingSequence.push(
          { component: HiComponent, data: { admin: this.admin, adminComplete: true, userComplete: true, useModals: false } }
        );
      }
    }
  }

  currentOnboardingComponent(): IModal {
    return this.onboardingSequence[this.onboardingIndex];
  }

  showPreviousOnboardingComponent(): void {
    // Do not rewind past 0
    if (this.onboardingIndex > 0) {
      this.onboardingIndex--;
    }
    this.launchCurrentOnboardingComponent();
  }

  showNextOnboardingComponent(): void {
    // If the user just selected a Behavior, insert the behavior-specific onboarding components into the onboarding component sequence
    const currentOnboardingComponent = this.currentOnboardingComponent();
    if (currentOnboardingComponent && currentOnboardingComponent.component === BehaviorComponent) {
      this.spliceInBehaviorSpecificOnboardingComponents();
    }

    this.onboardingIndex++;
    this.launchCurrentOnboardingComponent();
  }

  handleOnboardingComponentResult(result: string) {
    this.onboardingSubscription.unsubscribe();
    switch (result) {
      case undefined:
        break;
      case 'back':
        this.showPreviousOnboardingComponent();
        break;
      case 'skip':
        this.exitOnboarding();
        break;
      case 'success':
      default:
        this.showNextOnboardingComponent();
    }
  }

  launchCurrentOnboardingComponent(): void {
    // Exit if no Onboarding Components left
    if (!this.currentOnboardingComponent()) {
      this.exitOnboarding();
      return;
    }

    const onboardingComponent = this.currentOnboardingComponent().component;
    const data = this.currentOnboardingComponent().data || {};
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(onboardingComponent as any);

    this.viewContainer.clear();
    const componentRef = this.viewContainer.createComponent(componentFactory);
    const componentInstance = componentRef.instance;

    for (let [key, value] of Object.entries(data)) {
      componentInstance[key] = value;
    }
    this.onboardingSubscription = componentInstance['result'].subscribe(result => this.handleOnboardingComponentResult(result));
  }

  behaviorSpecificOnboardingComponents(): IModal[] {
    const onboardingComponents = [];
    const behavior = this.groupService.group.behavior;
    if (behavior === 'autoAttendant' && !this.adminOnboardingComponents.huntGroups) {
      onboardingComponents.push({ component: DepartmentsComponent, data: { useModals: false } });
    }
    if (behavior === 'autoAttendant' && !this.adminOnboardingComponents.phoneMenu) {
      onboardingComponents.push({ component: PhoneMenuModalComponent, data: { useModals: false } });
    }
    if (behavior === 'autoAttendant' && !this.adminOnboardingComponents.autoAttendant) {
      onboardingComponents.push({ component: AudioModalComponent, data: { audioType: 'autoAttendant', useModals: false } });
    }
    if (behavior === 'receptionist' && !this.adminOnboardingComponents.receptionist) {
      onboardingComponents.push({ component: DirectCallComponent, data: { useModals: false } });
    }
    return onboardingComponents;
  }

  // Call this method when after the user selects a behavior
  // It will insert the behavior-specific onboarding components into the onboarding components sequence
  spliceInBehaviorSpecificOnboardingComponents(): void {
    this.onboardingSequence.splice(this.onboardingIndex + 1, 0, ...this.behaviorSpecificOnboardingComponents());
  }

  shouldadminOnboardingComponentsBeShown(): boolean {
    return ((this.admin
      && (!this.adminOnboardingComponents.voiceMail
      || !this.adminOnboardingComponents.behavior))
      || (this.autoAttendantOverride)) ;
  }

  shoulduserOnboardingComponentsBeShown(): boolean {
    if (!this.cms.get('onboardingUserComponentsEneabled')) {
      return !this.userOnboardingComponents.simRing
      || !this.userOnboardingComponents.voiceMail
      || !this.userOnboardingComponents.validPassword;
    } else {
      return false;
    }
  }

  exitOnboarding() {
    if (this.onboardingSubscription) {
      this.onboardingSubscription.unsubscribe();
    }
    // For some reason the setTimeout suppresses an ExpressionChangedAfterItHasBeenCheckedError error
    setTimeout(() => {
      this.adminService.showFTUE = false;
    }, 0);

    // Logs the user out since they have finished or want to exit redirects back to country selector
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/countryselector']);
    });

  }

}
