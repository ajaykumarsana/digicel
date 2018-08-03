import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { pull } from 'lodash';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { UserService, CallLogEntry } from '../user';
import { Group } from './group';
import { TeamMember } from './team-member';
import { OrderStatus } from './order-status';
import { IAddress } from 'interfaces';
import { AddressType } from './address-type';
import { MOCK_CUSTOMER } from './mock-customer';
import { Customer } from './customer';
import { AutoAttendantService } from '../auto-attendant';
import { HuntGroupService } from '../hunt-group';
import { extractAreaCode } from '../utility-methods';

@Injectable()
export class GroupService {
  serviceProviderId: string;
  // Fetched on login
  group: Group;
  // Fetched on login
  teamMembers: TeamMember[] = [];
  // Fetched on login
  systemMembers: TeamMember[] = [];
  billingInfo: {};
  customer = new Customer(MOCK_CUSTOMER);

  isAutoAttendantSet: boolean;
  isHuntGroupSet: boolean;
  isReceptionistSet: boolean;
  isVoicemailSet: boolean;
  isPhoneMenuSet: boolean;
  isBehaviorSet: boolean;
  aaOverride: boolean;

  constructor(
    private apiService: ApiService,
    private cms: CmsService,
    private userService: UserService,
    private autoAttendantService: AutoAttendantService,
    private huntGroupService: HuntGroupService
  ) {
    this.serviceProviderId = this.cms.getEngine();
  }

  getGroup(): Observable<Group> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}`;
    return this.apiService.call('speed', 'get', path)
      .map(group => {
        group['customer'] = this.customer;
        this.group = new Group(group);
        console.log('this is our group ', this.group);
        this.setGroupProps();
        return this.group;
      });
  }

  // fakery method
  getBillingInfo(): Observable<any> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/billing/info`;
    return this.apiService.call('speed', 'get', path)
      .map(billingInfo => {
        this.billingInfo = billingInfo;
        return billingInfo;
      });
  }

  getTeamMembers(): Observable<TeamMember[]> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/users`;
    return this.apiService.call('speed', 'get', path)
      .map(res => {
        this.teamMembers = [];
        if (res && res['users']) {
          res['users'].forEach(user => {
            if (user['role'] === 'system') {
              this.systemMembers.push(new TeamMember(user));
            } else {
              this.teamMembers.push(new TeamMember(user));
            }
          });
        }
        return this.teamMembers;
      });
  }

  // Returns the list of team members enabled for chat minus the current user
  getOtherTeamMembers(): TeamMember[] {
    const currentUserId = this.userService.user.userId;
    return this.teamMembers.filter(teamMember => teamMember.IMPId && currentUserId !== teamMember.IMPId);
  }

  getDefaultOtherTeamMemberId(): string {
    return this.getOtherTeamMembers()[0].userId;
  }

  getMemberByPhone(phoneNumber: string): TeamMember {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return this.teamMembers.find(teamMember => cleanNumber === teamMember.number);
  }

  getMemberByExtension(extension: string): TeamMember {
    // const cleanNumber = phoneNumber.replace(/\D/g, '');
    return this.teamMembers.find(teamMember => extension === teamMember.extension);
  }

  getMemberById(memberId: string): TeamMember {
    return this.teamMembers.find(teamMember => memberId === teamMember.userId);
  }

  getMemberByIMPId(IMPId: string): TeamMember {
    return this.teamMembers.find(teamMember => IMPId === teamMember.IMPId);
  }

  updateMember(oldTeamMember: TeamMember, updateBody:
    {firstName?: string, lastName?: string, email?: string, mainUser?: boolean}): Observable<TeamMember> {
    const path = `user/${this.serviceProviderId}/${oldTeamMember.IMPId}`;
    return this.apiService.call('speed', 'put', path, updateBody)
      .map(res => {
        const updatedTeamMember = new TeamMember(res['profile']);
        const i = this.teamMembers.indexOf(oldTeamMember);
        return this.teamMembers[i] = updatedTeamMember;
      });
  }

  deleteMember(teamMember: TeamMember): Observable<any> {
    const path = `${this.serviceProviderId}/order/${this.group.groupId}/${teamMember.IMPId}`;
    return this.apiService.call('speed', 'delete', path)
      .map(() => pull(this.teamMembers, teamMember));
  }

  addMember(memberInfo: {}): Observable<TeamMember> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/order/${groupId}`;
    memberInfo['users'][0]['serviceProviderId'] = this.serviceProviderId;
    memberInfo['users'][0]['areaCode'] = this.getAreaCode();
    return this.apiService.call('speed', 'put', path, memberInfo)
      .map(res => {
        if (res['users']) {
          const newTeamMember = new TeamMember(res['users'][0]);
          this.teamMembers.push(newTeamMember);
          return newTeamMember;
        } else {
          throw new Error(res['statusMsg'] || 'Error adding team member');
        }
      });
  }

  getCompanyCallLog(): Observable<CallLogEntry[]> {
    const callLog: CallLogEntry[] = [];
    const groupId = this.userService.user.groupId;
    const autoAttendantId = this.autoAttendantService.autoAttendant.autoAttendantId;
    const path = `${this.serviceProviderId}/group/${groupId}/log/${autoAttendantId}`;

    return this.apiService.call('speed', 'get', path)
      .map(res => {
        if (res && res[autoAttendantId]) {
          ['received', 'missed', 'placed'].forEach((type: 'received' | 'missed' |'placed') => {
            res[autoAttendantId][type].forEach(call => {
              callLog.push(new CallLogEntry(call, type));
            });
          });
        }
        // Show the most recent calls at the top of the list
        return callLog.sort((a, b) => b.time.getTime() - a.time.getTime());
      });
  }

  getOrderStatuses(): Observable<OrderStatus[]> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/notes`;
    return this.apiService.call('speed', 'get', path)
      .map(res => (res['notes'] || []).map(orderStatus => new OrderStatus(orderStatus)));
  }

  getAddress(type: AddressType): IAddress {
    return this.group.customer[type];
  }

  setAddress(type: AddressType, address: IAddress): Observable<any> {
    this.group.customer[type] = address;
    let patchData = {customer: {}};

    patchData.customer[type] = this.group[type];

    return this.updateGroup(patchData);
}

  getPaymentInstrument() {
    let paymentInst = this.group.customer.paymentInstrument;
    return paymentInst;
  }

  updateGroup(patchData: {}): Observable<any> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}`;
    return this.apiService.call('speed', 'put', path, patchData);
  }

  deleteGroup(): Observable<any> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}`;
    return this.apiService.call('speed', 'delete', path);
  }

  // Returns full number or extension none is found
  lookupNumberByExt(extension: string): string {
    const teamMember = this.teamMembers.find(t => t.extension === extension);
    return teamMember ? teamMember.number || extension : extension;
  }

  setGroupProps() {
    this.isAutoAttendantSet = this.group.mainLine.destination === 'autoAttendant' && !!this.group.greetings.autoAttendant;
    // this.isHuntGroupSet = this.group.mainLine.destination === 'autoAttendant' && this.huntGroupsExist;
    this.isReceptionistSet = !!this.group.receptionist;
    this.isVoicemailSet = !!this.group.voicemail;
    this.isHuntGroupSet = this.doHuntGroupsExist();
    this.isPhoneMenuSet = this.doesPhoneMenuExist();
    this.isBehaviorSet = !!this.group.mainLine.destination;
  }

  getAutoAttendantConfig() {
    return this.autoAttendantService.autoAttendant;
  }

  getIsAutoAttendantSet(): boolean {
    return this.isAutoAttendantSet;
  }

  setIsAutoAttendantSet(value: boolean) {
    this.isAutoAttendantSet = value;
  }

  getIsHuntGroupSet(): boolean {
    return this.isHuntGroupSet;
  }

  setIsHuntGroupSet(value: boolean) {
    this.isHuntGroupSet = value;
  }

  getIsReceptionistSet(): boolean {
    return this.isReceptionistSet;
  }

  setIsReceptionistSet(value: boolean) {
    this.isReceptionistSet = value;
  }

  getIsVoicemailSet(): boolean {
    return this.isVoicemailSet;
  }

  setIsVoicemailSet(value: boolean) {
    this.isVoicemailSet = value;
  }

  getIsBehaviorSet(): boolean {
    return this.isBehaviorSet;
  }

  setIsBehaviorSet(value: boolean) {
    this.isBehaviorSet =  value;
  }

  getIsPhoneMenuSet(): boolean {
    return this.isPhoneMenuSet;
  }

  setIsPhoneMenuSet(value: boolean) {
    this.isPhoneMenuSet = value;
  }

  getHuntGroupsExist(): boolean {
    return this.isHuntGroupSet;
  }

  doHuntGroupsExist(): boolean {
    let hgLength = this.huntGroupService.huntGroupTable.huntGroupTable.length;
    let huntGroupsExist;
    if (hgLength > 0) {
      huntGroupsExist = true;
    } else {
      huntGroupsExist = false;
    }
    return huntGroupsExist;
  }

  doesPhoneMenuExist(): boolean {
    let numberOfMenuOptions = Object.keys(this.autoAttendantService.autoAttendant.menu).length;
    let phoneMenuSet;
    if (numberOfMenuOptions > 3) {
      phoneMenuSet = true;
    } else {
      phoneMenuSet = false;
    }
    return phoneMenuSet;
  }

  resetAutoAttendantOptions() {
    this.aaOverride = true;
    this.setIsHuntGroupSet(false);
    this.setIsReceptionistSet(false);
    this.setIsPhoneMenuSet(false);
  }

  setBehavior(behavior: any) {
    this.group.behavior = behavior;
  }

  getAreaCode(): string {
    return this.group.phoneNumber && extractAreaCode(this.group.phoneNumber);
  }

}
