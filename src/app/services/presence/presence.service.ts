import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { ApiService } from '../api';
import { GroupService } from '../group';

export type Status = 'available' | 'away' | 'idle' | 'offline' | 'busy';
export interface Statuses { [userId: string]: Status; }

@Injectable()
export class PresenceService {
  private username: string;
  private udid: string;
  public userPresence: Status;
  // Fetched on login
  private statusesSubject: BehaviorSubject<Statuses> = new BehaviorSubject({});
  // Fetched on login
  public statuses: Observable<Statuses> = this.statusesSubject.asObservable();
  private statusSubscription: Subscription;
  private pollingInterval = 10000;

  constructor(private apiService: ApiService, private groupService: GroupService) { }

  initialize(username: string, udid: string) {
    this.username = username;
    this.udid = udid;
  }

  setPresence(status: Status, priority = -30): Observable<any> {
    this.userPresence = status;
    return this.apiService.call('ums', 'put', `gateway/presence/set/${this.username}`, {
      show: status,
      pri: priority,
      res: this.udid
    });
  }

  getStatuses(): Observable<Statuses> {
    const jids = this.groupService.teamMembers.map(member => member.IMPId);
    return this.apiService.call('ums', 'post', `gateway/presence/get`, {
      jids: jids
    }).map(res => {
      const statuses = {};
      if (res && res['users']) {
        res['users'].forEach(element => {
          statuses[element['jid']] = element['show'] as Status;
        });
      }
      return statuses;
    });
  }

  pollStatuses() {
    return Observable.timer(0, this.pollingInterval)
      .flatMap(() => this.getStatuses())
      .map(statuses => {
        this.statusesSubject.next(statuses);
      });
  }

  startPollingForStatus() {
    this.statusSubscription = this.pollStatuses().subscribe();
  }

  stopPollingForStatus() {
    this.statusSubscription.unsubscribe();
  }

}
