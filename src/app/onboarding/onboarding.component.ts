import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { User, UserService, Group, TeamMember, AdminData, AdminService, PresenceService,
  CmsService, GroupService, ToastService } from 'services';
import { SoftphoneComponent } from '../admin/softphone/softphone.component';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  @ViewChild(SoftphoneComponent) softphoneComponent: SoftphoneComponent;
  user: User;
  group: Group;
  teamMembers: TeamMember[] = [];

  constructor(
    public adminService: AdminService,
    private userService: UserService,
    public cms: CmsService,
    private groupService: GroupService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.group = this.groupService.group;
    this.teamMembers = this.groupService.getOtherTeamMembers();
    this.showStartupToasts();
  }

  ngOnDestroy() {
    this.adminService.navigateAway();
  }

  showStartupToasts() {
    this.groupService.getOrderStatuses().subscribe(statuses => {
      const errors = statuses.filter(s => s.category === 'error');
      errors.forEach(status => {
        const link = {
          text: this.cms.get('clickForDetails'),
          route: 'settings/order-status'
        };
        // @Todo Remove this after Connections for demo only
        if (this.cms.getLanguage() === 'en' ) {
          this.toastService.toast(status.title, 'warning', 300000, true, link);
        }
      });
    });

    if (this.group.trialInfo.isTrial) {
      const link = {
        text: this.cms.get('clickToUpgrade'),
        // TODO: Change to post-trial wizard link
        route: '/post-trial'
      };
      const toastText = this.cms.get('trialExpiring', this.group.trialInfo.daysRemaining);
      this.toastService.toast(toastText, 'warning', 300000, true, link);
    }
  }

  toggleSoftphone() {
    this.softphoneComponent.toggleOpen();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
      this.adminService.onWindowClose();
  }

  showNav(position: 'right' | 'left' | 'none'): boolean {
    return position === this.cms.getFromProvider('sidenavPosition');
  }

  showSoftPhone(): boolean {
    return this.cms.getFromProvider('softPhoneEneabled');
  }

}
