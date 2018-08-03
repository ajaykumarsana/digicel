import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';
import { ApiService } from '../api';
import { ChatService } from '../chat';
import { PresenceService } from '../presence';
import { AvatarService } from '../avatar';

@Injectable()
export class MessagingService {
  private user: User;
  private username: string;
  // Unique device ID. Will be username with invalid chars replaced by dashes
  private udid: string;

  constructor(
    private apiService: ApiService,
    private presenceService: PresenceService,
    private avatarService: AvatarService,
    private chatService: ChatService
  ) { }

  // This needs to be called before making other calls. Currently called by adminService.initialize()
  initialize(user: User): void {
    this.user = user;
    this.username = this.user.xmpp.username;
    this.udid = this.username.replace(/[\.@]/g, '-');

    this.apiService.setHeader('ums', 'Authorization',
      'Basic ' + btoa(`${this.username}:${this.user.xmpp.password}`)
    );
    // TODO: Fallback to other endpoints if the first one fails
    this.apiService.setBaseUrl('ums', this.user.xmpp.umsEndpoints[0]);

    this.initializeChildServices();

    this.registerDevice().flatMap(() => this.presenceService.setPresence('available'))
      .subscribe(() => console.log('device registered and status set to "available"'));
  }

  unregisterDevice(): Observable<any> {
    const path = `gateway/v2/registration/${this.username}/${this.udid}`;
    return this.apiService.call('ums', 'delete', path);
  }

  private initializeChildServices(): void {
    this.presenceService.initialize(this.username, this.udid);
    this.avatarService.initialize(this.user, this.username, this.udid);
    this.chatService.initialize(this.username, this.udid);
  }

  private registerDevice(): Observable<any> {
    const path = `gateway/v2/registration/${this.username}/${this.udid}`;
    return this.apiService.call('ums', 'put', path,
      {
        registration: {
          'app-id': 'mbe-easy-ui',
          'client-version': '0.0.2',
          'device-type': 'Android',
          'device-version': '1.0.0',
          'token': this.udid
        }
      }
    );
  }

}
