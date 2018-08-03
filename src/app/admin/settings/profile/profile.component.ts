import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CmsService, GroupService, UserService, TeamMember } from 'services';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('newAdminForm') newAdminForm: MemberProfileComponent;
  @ViewChild('newUserForm') newUserForm: MemberProfileComponent;
  currentUser: TeamMember;
  admins: TeamMember[];
  users: TeamMember[];
  linePrice: string;

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private userService: UserService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('team'));
  }

  ngOnInit() {
    this.admins = [];
    this.users = [];
    const userId = this.userService.user.userId;
    const teamMembers = this.groupService.teamMembers;
    teamMembers.forEach(teamMember => {
      if (teamMember.IMPId === userId) {
        this.currentUser = teamMember;
      } else if (teamMember.isAdmin()) {
        this.admins.push(teamMember);
      } else {
        this.users.push(teamMember);
      }
    });

    this.linePrice = this.cms.getFromProvider('linePrice');
  }

  addUser() {
    this.newUserForm.editMode = true;
  }

  addAdmin() {
    this.newAdminForm.editMode = true;
  }

  anyAvailableLines(): boolean {
    return this.groupService.teamMembers.length < this.cms.getFromProvider('maxUsers');
  }

}
