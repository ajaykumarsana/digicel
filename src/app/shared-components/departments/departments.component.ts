/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CmsService, GroupService, TeamMember } from 'services';
import { HuntGroup, HuntGroupService, HuntGroupMember, HuntGroupTable, HuntGroupObject } from 'services';
import { HuntGroup as HuntGroupCom } from '../../shared-components/hunt-group';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface DepartmentsInterface {
  useModals: boolean;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends WizardPage implements DepartmentsInterface, OnInit {
  numberOfGroups = 0;
  maxGroups = this.cms.getFromProvider('maxHuntGroups');
  members: TeamMember[];
  huntGroups: HuntGroupTable;
  HuntGroupMembers: HuntGroupMember[];
  huntGroupShim: Array<any> = []; // Temp fix for quickness (open status)
  showError = false;
  errorMsg: string;
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private huntGroupService: HuntGroupService,
    private titleService: Title
  ) {
    super();
    this.titleService.setTitle(this.cms.get('company-auto-attendant-header'));
  }

  ngOnInit() {
    this.huntGroups = this.huntGroupService.huntGroupTable;
    this.members = this.groupService.teamMembers;

    if (this.huntGroups.huntGroupTable.length === 0) {
      let hg = new HuntGroup({
        extention: null,
        huntGroupId: null,
        huntGroupName: null,
        isActive: null,
        language: null,
        members: [],
        noAnswerNumberOfRings: null,
        phoneNumber: null,
        policy: 'Regular',
        timezone: null
      });
      let hgo = new HuntGroupObject({
        huntGroupName: hg.huntGroupName,
        huntGroup: hg
      });
      this.huntGroups.huntGroupTable.push(hgo);
    }

    this.huntGroupShim = [];
    let len = this.huntGroups.huntGroupTable.length;
    for (let i = 0; i < len; i++) {
      this.numberOfGroups++;
      this.huntGroupShim.push({
        huntGroup: this.huntGroups.huntGroupTable[i].huntGroup,
        open: this.huntGroups.huntGroupTable[i].huntGroup.huntGroupName === '',
        teamMembers: this.members
      });
    }
  }

  // See if form is open or closed
  handleFormChange(data) {
    this.huntGroupShim[data.groupIndex].open = data.openState;
  }

  addAnotherGroup() {
    this.numberOfGroups++;
    let hg = new HuntGroup({
      huntGroupName: null,
      policy: 'Regular',
      extension: null,
      phoneNumber: null,
      members: []
    });
    let hgo = new HuntGroupObject({
      huntGroupName: hg.huntGroupName,
      HuntGroupObject: hg
    });
    this.huntGroups.huntGroupTable.push(hgo);
    this.huntGroupShim.push({
      huntGroup: hg,
      open: true,
      teamMembers: this.members
    });
  }

  // Builds array of all the phone numbers from an array of team members
  getHuntGroupMemberNumbers(members: TeamMember[]) {
    let membersArray: Array<string> = [];
    for (let i = 0; i < members.length; i++) {
      membersArray.push(members[i].number);
    }
    return membersArray;
  }

  decrementNumberOfGroups() {
    this.huntGroupService.getHuntGroups().subscribe( huntGroups => {
      this.numberOfGroups--;
      this.huntGroups = huntGroups;
    });
  }

  checkEditMode(): boolean {
    return !!(this.huntGroups && this.huntGroupShim.find((group) => group.open));
  }

  handleError(err) {
    let errorMessage = this.cms.get('appErrors.E4200', err.huntGroup.huntGroupName);
    this.setAndShowErrorMsg(errorMessage);
  }

  setAndShowErrorMsg(errorMsg) {
    console.log('in setAndShowErrorMsg err = ', errorMsg);
    this.errorMsg = errorMsg;
    this.showError = true;
    setTimeout(() => this.showError = false, 5000);
  }

}
