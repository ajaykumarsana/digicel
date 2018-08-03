import { Component, OnInit, Input } from '@angular/core';
import { UserService, CmsService, TeamMember, VoicemailService } from 'services';
import { NavLink } from './nav-link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() teamMembers: TeamMember[];
  public openTeam = false;
  isAdmin: boolean;
  navLinks: NavLink[];
  adminLinks: NavLink[];

  constructor(
    private router: Router,
    public cms: CmsService,
    private userService: UserService,
    private voicemailService: VoicemailService
  ) {
    this.navLinks = [
      {route: 'user-voicemail', cmsKey: 'voicemail', icon: 'voicemail',
        countMethod: this.getUnreadUserVoicemailCount.bind(this)},
      {route: 'call-history', cmsKey: 'callHistory', icon: 'call-history'},
      {route: 'devices', cmsKey: 'devices', icon: 'devices'}
    ];
    this.adminLinks = [
      {route: 'receptionist', cmsKey: 'autoAttendant', icon: 'auto-attendant'},
      {route: 'company-voicemail', cmsKey: 'companyVoicemail', icon: 'company',
        countMethod: this.getUnreadCompanyVoicemailCount.bind(this)},
      {route: 'company-call-history', cmsKey: 'companyCallHistory', icon: 'company'},
      {route: 'analytics', cmsKey: 'teamAnalytics', icon: 'analytics'}
    ];
  }

  ngOnInit() {
    this.isAdmin = this.userService.isAdmin();
    if (this.router.url.indexOf('/team/') !== -1) {
      this.openTeam = true;
    }
  }

  showCount(navLink: NavLink): boolean {
    return navLink.countMethod && navLink.countMethod() > 0;
  }

  getUnreadUserVoicemailCount(): number {
    return this.voicemailService.unreadUserVoicemailCount;
  }

  getUnreadCompanyVoicemailCount(): number {
    return this.voicemailService.unreadCompanyVoicemailCount;
  }

  setOpen() {
    this.openTeam = true;
  }

  toggleOpen() {
    this.openTeam = !this.openTeam;
  }

}
