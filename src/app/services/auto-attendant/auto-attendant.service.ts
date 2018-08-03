import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { UserService } from '../user';
import { AutoAttendant } from './attendant';
import { KeyConfigurationObject } from './key-configuration';

@Injectable()
export class AutoAttendantService {

  public serviceProviderId;
  public groupId;
  // Fetched on login for admins
  public autoAttendant: AutoAttendant;

  constructor(
    private api: ApiService, private cms: CmsService, private userService: UserService) {
      this.serviceProviderId = this.cms.getEngine();
  }

  // @TODO: Maybe we should be setting the auto attendant here with the response
  // ...if the response is useful..otherwise, call get - but this is extra api call
  createAutoAttendant(payload) {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/attendant`;
    return this.api.call('speed', 'put', path, payload);
  }

  // Gets Auto Attendant (via api) and sets up auto attendant singleton
  getAutoAttendant(): Observable<AutoAttendant> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/attendant`;
    return this.api.call('speed', 'get', path)
      .map(autoAttendant => {
        this.autoAttendant = new AutoAttendant(autoAttendant);
        return this.autoAttendant;
      });
  }

}
