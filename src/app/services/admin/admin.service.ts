import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService, User } from '../user';
import { GroupService, Group, TeamMember } from '../group';
import { MessagingService } from '../messaging';
import { AvatarService } from '../avatar';
import { PresenceService } from '../presence';
import { ChatService } from '../chat';
import { CallingService } from '../calling';
import { CmsService } from '../cms';
import { AdminData } from './admin-data';
import { AutoAttendantService } from '../auto-attendant';
import { VoicemailService } from '../voicemail';
import { HuntGroupService } from '../hunt-group';
import { ToastService } from '../toast';

@Injectable()
export class AdminService implements Resolve<AdminData> {
  user: User;
  showFTUE: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private messagingService: MessagingService,
    private avatarService: AvatarService,
    private presenceService: PresenceService,
    private chatService: ChatService,
    private callingService: CallingService,
    private cms: CmsService,
    private autoAttendantService: AutoAttendantService,
    private huntGroupService: HuntGroupService,
    private voicemailService: VoicemailService,
    private toastService: ToastService
  ) { }

  // This method fetches all the data we need for loading the FTUE and admin page
  //
  // The following service properties are set by this method
  // You can assume they are all availabe from any component in the admin or FTUE part of the app without having to hit the API again
  // NOTE: Please update this list if you change the resolve() method
  //       Also update comments in each service that is affected
  //
  // AVAILABLE FOR ALL USERS
  // userService.user
  // userService.devices
  // voicemailService.userVoicemails
  // groupService.group
  // groupService.teamMembers, groupService.systemMembers
  // chatService.messagesSubject, chatService.messages
  // presenceService.statusesSubject, presenceService.statuses
  // avatarService.vcards, avatarService.userVcard
  //
  // AVAILABLE FOR ADMINS
  // voicemailService.companyVoicemails
  // autoAttendantService.autoAttendant
  // huntGroupService.huntGroupTable
  //
  // @param showFTUE [default=true] Determines whether to show FTUE module
  resolve(): Observable<AdminData> {
    // Make sure FTUE component checks if it needs to load every time we come into the admin app
    this.showFTUE = true;
    // Get user info, calling GET /login if necessary
    return this.userService.getUserOrLogin()
    // If user is not authenticated, redirect to login page
    .catch(err => {
      this.router.navigate(['/login']);
      return Observable.of(null);
    })
    // Initialize services that require user info
    .map(user => {
      if (user) {
        this.user = user;
        this.messagingService.initialize(this.user);
        this.callingService.initialize(this.user.sip);
      }
    // Make a bunch of API calls that require user info
    }).flatMap(() => {
      // If no user (not authenticated), exit this method by returning observable of null
      if (!this.user) {
        return Observable.of(null);
      }
      // The API calls that all users need to determine FTUE status and bootstrap the admin portal
      let initializationCalls: Observable<any>[] = [
        this.groupService.getGroup().map(() => {
          this.voicemailService.startPollingForVoicemails();
        }),
        // Allow this call to fail and continue loading admin
        this.userService.getDevices().catch(e => this.catchApiError(e, this.cms.get('devices'))),
        this.groupService.getTeamMembers().flatMap(teamMembers => {
          this.presenceService.startPollingForStatus();
          // Allow this call to fail and continue loading admin
          return this.avatarService.getVcardsFromApi(teamMembers.map(teamMember => teamMember.IMPId))
            .catch(e => this.catchApiError(e, 'Avatars'));
        })
      ];
      // The API calls that only admins need to determine FTUE status
      const adminCalls: Observable<any>[] = [
        // Allow this call to fail and continue loading admin
        this.autoAttendantService.getAutoAttendant().catch(e => this.catchApiError(e, this.cms.get('autoAttendant'))),
        // Allow this call to fail and continue loading admin
        this.huntGroupService.getHuntGroups().catch(e => this.catchApiError(e, this.cms.get('huntGroups')))
      ];
      // Add the admin calls to the array if the user is an admin
      if (this.userService.isAdmin()) {
        initializationCalls.push(...adminCalls);
      }

      // Make all the API calls in parallel
      return Observable.forkJoin(...initializationCalls);
    });
  }

  navigateAway() {
    this.callingService.shutDown();
    this.chatService.stopPollingForMessages();
    this.presenceService.stopPollingForStatus();
    this.voicemailService.stopPollingForVoicemails();
    this.messagingService.unregisterDevice().subscribe(() => console.log('unregistered device'));
  }

  onWindowClose() {
    console.log('closing window');
    this.callingService.shutDown();
    // Unregister device on window close
    let registered = true;
    this.messagingService.unregisterDevice().subscribe(
      () => registered = false
    );
    // Wait 1 second to make sure unregistration call is fired
    this.syncWait(1000);
  }

  private syncWait(ms: number) {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  private catchApiError(err: Error, thingThatDidntLoad: string): Observable<any> {
    this.toastService.toast(this.cms.get('failedToLoad', thingThatDidntLoad), 'warning', 15000, true);
    return Observable.of({});
  }

}
