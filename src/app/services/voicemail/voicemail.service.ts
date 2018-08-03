import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { differenceBy } from 'lodash';
import { ApiService } from '../api';
import { User } from '../user';
import { CmsService } from '../cms';
import { UserService } from '../user';
import { GroupService } from '../group';
import { Voicemail } from './voicemail';

@Injectable()
export class VoicemailService {
  // Fetched on login
  public userVoicemails: BehaviorSubject<Voicemail[]> = new BehaviorSubject([]);
  // Fetched on login for admins
  public companyVoicemails: BehaviorSubject<Voicemail[]> = new BehaviorSubject([]);
  public unreadUserVoicemailCount = 0;
  public unreadCompanyVoicemailCount = 0;

  private serviceProviderId: string;
  private userVoicemailSubscription: Subscription;
  private companyVoicemailSubscription: Subscription;
  private slowPollingInterval = 60000; // 60 seconds in background
  private fastPollingInterval = 10000; // 10 seconds when on voicemail page
  private pollFastForUser = false;
  private pollFastForCompany = false;


  constructor(
    private apiService: ApiService,
    private cms: CmsService,
    private userService: UserService,
    private groupService: GroupService
  ) {
    this.serviceProviderId = this.cms.getEngine();
  }

  // Called by admin resolver
  startPollingForVoicemails(): void {
    this.userVoicemailSubscription = this.pollVoicemails('user').subscribe();
    if (this.userService.isAdmin()) {
      this.companyVoicemailSubscription = this.pollVoicemails('company').subscribe();
    }
  }

  // Called when navigating away from admin
  stopPollingForVoicemails(): void {
    if (this.userVoicemailSubscription) {
      this.userVoicemailSubscription.unsubscribe();
    }
    if (this.companyVoicemailSubscription) {
      this.companyVoicemailSubscription.unsubscribe();
    }
  }

  changeUserPollingSpeed(speed: 'fast' | 'slow') {
    const newValue = speed === 'fast';
    if (this.pollFastForUser !== newValue) {
      this.pollFastForUser = newValue;
      this.userVoicemailSubscription.unsubscribe();
      this.userVoicemailSubscription = this.pollVoicemails('user').subscribe();
    }
  }

  changeCompanyPollingSpeed(speed: 'fast' | 'slow') {
    const newValue = speed === 'fast';
    if (this.pollFastForCompany !== newValue) {
      this.pollFastForCompany = newValue;
      this.companyVoicemailSubscription.unsubscribe();
      this.companyVoicemailSubscription = this.pollVoicemails('company').subscribe();
    }
  }

  setVoiceMailReadStatus(type: 'user' | 'company', messageId, readStatus) {
    let vmId = type === 'user' ? this.userService.user.userId : this.groupService.group.mainLine.voicemailUser;
    const path = `user/${this.serviceProviderId}/${vmId}/voicemail/${messageId}`;
    return this.apiService.call('speed', 'put', path, {unread: readStatus});
  }

  deleteVoiceMail(type: 'user' | 'company', messageId) {
    let vmId = type === 'user' ? this.userService.user.userId : this.groupService.group.mainLine.voicemailUser;
    const path = `user/${this.serviceProviderId}/${vmId}/voicemail/${messageId}`;
    return this.apiService.call('speed', 'delete', path);
  }

  private getVoiceMails(type: 'user' | 'company'): Observable<Voicemail[]> {
    let vmId = type === 'user' ? this.userService.user.userId : this.groupService.group.mainLine.voicemailUser;
    const path = `user/${this.serviceProviderId}/${vmId}/voicemail`;

    return this.apiService.call('speed', 'get', path)
      .map(voicemails => {
        let cachedVoicemails = type === 'user' ? this.userVoicemails : this.companyVoicemails;
        return cachedVoicemails = voicemails.voicemail.map(v => new Voicemail(v));
      });
  }

  private pollVoicemails(type: 'user' | 'company'): Observable<any> {
    const forUser = type === 'user';
    const subject = forUser ? this.userVoicemails : this.companyVoicemails;
    const pollFastFlag = forUser ? this.pollFastForUser : this.pollFastForCompany;
    const pollingInterval = pollFastFlag ? this.fastPollingInterval : this.slowPollingInterval;

    return Observable.timer(0, pollingInterval)
      .flatMap(() => this.getVoiceMails(type))
      .map(voicemails => {
        // Only emit voicemails and update counts if there are any new voicemails
        if (this.anyNewVoicemails(subject.getValue(), voicemails)) {
          subject.next(voicemails);
          this.updateUnreadCount(type, voicemails);
        }
      });
  }

  private updateUnreadCount(type: 'user' | 'company', voicemails: Voicemail[]) {
    const unreadVoicemailCount = voicemails.filter(vm => vm.unread).length;
    if (type === 'user') {
      this.unreadUserVoicemailCount = unreadVoicemailCount;
    } else {
      this.unreadCompanyVoicemailCount = unreadVoicemailCount;
    }
  }

  private anyNewVoicemails(oldVms: Voicemail[], newVms: Voicemail[]): boolean {
    const uniqueVms = differenceBy(newVms, oldVms, (vm: Voicemail) => vm.messageId);
    return uniqueVms.length > 0;
  }

}
