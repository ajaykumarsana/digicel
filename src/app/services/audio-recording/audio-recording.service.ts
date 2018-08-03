import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { User } from '../user';
import { CmsService } from '../cms';
import { UserService } from '../user';
import { GroupService } from '../group';
import { Subject } from 'rxjs/Subject';
import { AutoAttendantService, AutoAttendant } from '../auto-attendant';

@Injectable()
export class AudioRecordingService {
  user: User;
  username: string;
  udid: string;
  private serviceProviderId: string;
  sourceChange: Subject<string> = new Subject<string>();

  constructor(
    private apiService: ApiService,
    private cms: CmsService,
    private userService: UserService,
    private groupService: GroupService,
    private autoAttendantService: AutoAttendantService) {
      this.serviceProviderId = this.cms.getEngine();
   }

  initialize(user: User, username: string, udid: string) {
    this.user = user;
    this.username = username;
    this.udid = udid;
  }

  getVoiceMailGreeting(type): Observable<any> {
    if (type === 'userVoicemail') {
      return Observable.of(this.userService.user);
    } else if (type === 'autoAttendant') {
      return this.groupService.getGroup();
    } else {
      return this.groupService.getGroup();
    }
  }

  setVMGreeting(audioSrc, updateType): Observable<any> {
    const user = this.userService.user;
    const groupId = user.groupId;
    const userId = user.userId;
    let fileName = audioSrc.substring(audioSrc.lastIndexOf('/') + 1);
    let path;
    if (updateType === 'userVoicemail') {
      path = `${this.serviceProviderId}/group/${groupId}/vm/greeting/set/${userId}/` + fileName;
    } else if (updateType === 'autoAttendant') {
      path = `${this.serviceProviderId}/group/${groupId}/attendant/greeting/` + fileName;
    } else {
      // company voicemail
      const companyVmId = this.groupService.group.mainLine.voicemailUser;
      path = `${this.serviceProviderId}/group/${groupId}/vm/greeting/set/${companyVmId}/` + fileName;
    }
    let formData = new FormData();
    return this.apiService.call('speed', 'post', path, formData, true).map((result) => {
      if (updateType === 'userVoicemail') {
        this.userService.updateUserVm(audioSrc);
      }
      this.sourceChange.next(updateType);
      return result;
    });
  }

  updateVoiceMailGreeting(soundBlob , fileName, updateType): Observable<any> {
    const user = this.userService.user;
    const groupId = user.groupId;
    const userId = user.userId;
    let path;
    if (updateType === 'userVoicemail') {
      path = `${this.serviceProviderId}/group/${groupId}/vm/greeting/${userId}/` + fileName;
    } else if (updateType === 'autoAttendant') {
      path = `${this.serviceProviderId}/group/${groupId}/attendant/` + fileName;
    } else {
      // company voicemail
      const companyVmId = this.groupService.group.mainLine.voicemailUser;
      path = `${this.serviceProviderId}/group/${groupId}/vm/greeting/${companyVmId}/` + fileName;
    }
    let formData = new FormData();
    formData.append('data', soundBlob);
    return this.apiService.call('speed', 'post', path, formData, true);
  }

}
