import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { UserService } from '../user';
import { HuntGroupTable } from './hunt-group-table';
import { HuntGroup } from './hunt-group';
import { HuntGroupObject } from './hunt-group-object';

@Injectable()
export class HuntGroupService {

  public groupId;
  public serviceProviderId;
  public huntGroups: Array<HuntGroup>;
  // Fetched on login for admins
  public huntGroupTable: HuntGroupTable;
  public huntGroup: HuntGroup;
  public huntGroupObject: HuntGroupObject;

  constructor(private api: ApiService, private cms: CmsService, private userService: UserService) {
    this.serviceProviderId = this.cms.getEngine();
  }

  // Creates a new hunt group on the server
  createHuntGroup(huntGroup: HuntGroup): Observable<HuntGroupTable> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/huntGroup`;
    const payload = {
      'groupName': huntGroup.huntGroupName,
      'policy': huntGroup.policy,
      'phoneNumber': huntGroup.phoneNumber || null,
      'extention': huntGroup.extension || null,
      'members': huntGroup.members
    };
    return this.api.call('speed', 'post', path, payload);
  }

  editHuntGroup(huntGroup: HuntGroup): Observable<HuntGroupTable> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/huntGroup/${huntGroup.huntGroupId}`;
    const payload = {
      'groupName': huntGroup.huntGroupName,
      'policy': huntGroup.policy,
      'phoneNumber': huntGroup.phoneNumber || null,
      'extention': huntGroup.extension || null,
      'members': huntGroup.members,
      'language': huntGroup.language,
      'noAnswerNumberOfRings': huntGroup.noAnswerNumberOfRings,
      'isActive': huntGroup.isActive,
      'timezone': huntGroup.timezone
    };

    return this.api.call('speed', 'put', path, payload);
  }

  // Deletes a hunt group on the server
  deleteHuntGroup(huntGroup: HuntGroup) {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/huntGroup/${huntGroup.huntGroupId}`;
    return this.api.call('speed', 'delete', path);
  }

  getHuntGroups(): Observable<HuntGroupTable> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/huntGroup`;
    return this.api.call('speed', 'get', path)
      .map(huntGroupObject => {
        this.huntGroupTable = new HuntGroupTable(huntGroupObject);
        return this.huntGroupTable;
      });
  }

  setHuntGroups(huntGroups: Array<HuntGroup>) {
    this.huntGroups = huntGroups;
    sessionStorage.setItem('huntGroups', JSON.stringify(this.huntGroups));
  }

  // Adds hunt group to array and updates session storage
  trackHuntGroup(huntGroup: HuntGroup) {
    let hgo = {
      huntGroupName: huntGroup.huntGroupName,
      huntGroupObject: huntGroup
    };
    let huntGroupObject = new HuntGroupObject(hgo);
    this.huntGroupTable.huntGroupTable.push(huntGroupObject);
  }

  removeFromTrack(huntGroup: HuntGroup) {
    let index = this.huntGroupTable.huntGroupTable.findIndex(function(element) {
      return element.huntGroup.huntGroupId === huntGroup.huntGroupId;
    });
    this.huntGroupTable.huntGroupTable.splice(index, 1);
  }

  // Clears all hunt group data
  clear() {
    this.huntGroups = [];
    sessionStorage.removeItem('huntGroups');
  }

  getNumberHuntGroups() {
    return this.huntGroups.length || 0;
  }
}
