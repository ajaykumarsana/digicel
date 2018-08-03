import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { IsValidNumberPipe } from 'pipes';
import { CmsService, CallingService, CallEvent, GroupService, TeamMember } from 'services';
import { DtmfTone } from './dtmf-tone';

type PhoneState = 'dialing' | 'connecting' | 'incoming' | 'in-call' | 'in-call-dtmf';

@Component({
  selector: 'app-softphone',
  templateUrl: './softphone.component.html',
  styleUrls: ['./softphone.component.scss']
})
export class SoftphoneComponent implements OnInit, OnDestroy {
  isOpen = false;
  isMuted = false;
  showDialpad: boolean;
  showCallerInfo: boolean;
  showInCallButtons: boolean;
  showBackChevron: boolean;
  phoneNumber: string;
  callerName: string;
  runningTime: string;
  runningTimeSubscription: Subscription;
  teamMember: TeamMember;
  state: PhoneState;
  callEventsSubscription: Subscription;
  currentCall: any;
  private validSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '*'];
  ringer: HTMLAudioElement;

  constructor(
    private ref: ChangeDetectorRef,
    public cms: CmsService,
    public callingService: CallingService,
    private groupService: GroupService
  ) {
    this.ringer = new DtmfTone('ring').getAudio();
    this.ringer.loop = true;
  }

  ngOnInit() {
    this.setState('dialing');
    this.callEventsSubscription = this.callingService.callEvents
      .subscribe(e => this.handleCallEvent(e));

    // Need to use a global for removeEventListener to work properly
    if (!window['MBE']) {
      window['MBE'] = {};
    }
    window['MBE']['appKeydown'] = this.appKeydown.bind(this);
    document.addEventListener('keydown', window['MBE']['appKeydown'], false);
  }

  ngOnDestroy() {
    this.callEventsSubscription.unsubscribe();
    this.stopTrackingRunningTime();
    document.removeEventListener('keydown', window['MBE']['appKeydown'], false);
  }

  setState(state: PhoneState) {
    this.state = state;
    this.updateElementsBasedOnState();
  }

  private updateElementsBasedOnState() {
    this.showDialpad = ['dialing', 'in-call-dtmf'].includes(this.state);
    this.showCallerInfo = ['incoming', 'connecting', 'in-call'].includes(this.state);
    this.showInCallButtons = ['connecting', 'in-call', 'in-call-dtmf'].includes(this.state);
    this.showBackChevron = this.state === 'in-call-dtmf';
  }

  private appKeydown(e) {
    // Do nothing if softphone is closed
    if (!this.isOpen) {
      return;
    }

    // Do nothing if entering into a field
    const tag = e.target.tagName.toLowerCase();
    if (!['select', 'input', 'textarea'].includes(tag)) {
      const key = e.key;
      if (this.validSymbols.includes(key)) {
        this.press(key);
      }
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.state === 'dialing') {
      setTimeout(() => document.getElementById('phoneInput').focus(), 0);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.callingService.muteLocalStream();
    } else {
      this.callingService.unmuteLocalStream();
    }
  }

  // Toggles state between dial pad and in call view
  toggleDTMF() {
    if (this.state !== 'in-call-dtmf') {
      this.setState('in-call-dtmf');
    } else {
      this.setState('in-call');
    }
    this.updateElementsBasedOnState();
  }

  call() {
    this.lookupTeamMember();
    this.setState('connecting');
    this.callingService.call(this.phoneNumber);
  }

  // Use this method to initiate a call from another service or component
  // Will only work if softphone is in 'dialing' state (i.e., not handling another call)
  initiateSoftphoneCall(phoneNumber: string) {
    if (this.state === 'dialing') {
      this.phoneNumber = phoneNumber;
      this.isOpen = true;
      this.call();
    } else {
      console.log('will not dial out while other call is in progress');
    }
  }

  hangUp() {
    this.callingService.terminateSession();
    this.closeAndReset();
  }

  private closeAndReset() {
    this.currentCall = null;
    this.isOpen = false;
    this.teamMember = null;
    this.stopTrackingRunningTime();
    this.setState('dialing');
  }

  press(symbol: string) {
    if (this.state === 'dialing' && /\d/.test(symbol)) {
      this.phoneNumber += symbol;
    } else if (['in-call', 'in-call-dtmf'].includes(this.state)) {
      this.sendDTMF(symbol);
    }
  }

  delete() {
    if (this.phoneNumber) {
      this.phoneNumber = this.phoneNumber.slice(0, -1);
    }
  }

  private sendDTMF(symbol: string) {
    this.callingService.sendDTMF(symbol);
    this.tempMute(750);
    const audio = new DtmfTone(symbol).getAudio();
    if (audio) {
      audio.play();
    }
  }

  private tempMute(ms: number) {
    this.callingService.muteLocalStream();
    setTimeout(() => this.callingService.unmuteLocalStream(), ms);
  }

  private stopRinger() {
    if (this.ringer.currentTime !== 0) {
      this.ringer.pause();
      this.ringer.currentTime = 0;
    }
  }

  private handleIncomingCall(sipEvent) {
    this.currentCall = sipEvent;
    const callerInfo = sipEvent.data.request.from;
    this.callerName = callerInfo.display_name;
    const callerPhone = callerInfo.uri.user;
    const validNumberPipe = new IsValidNumberPipe(this.cms);
    if (validNumberPipe.transform(callerPhone)) {
      this.phoneNumber = callerPhone;
    } else {
      this.phoneNumber = this.groupService.lookupNumberByExt(callerPhone);
    }
    this.lookupTeamMember();
    this.setState('incoming');
    this.isOpen = true;
  }

  startTrackingRunningTime() {
    this.runningTimeSubscription = Observable.timer(0, 1000)
      .subscribe(() => {
        this.runningTime = this.callingService.getRunningTime();
        this.ref.detectChanges();
      });
  }

  stopTrackingRunningTime() {
    this.runningTime = null;
    if (this.runningTimeSubscription) {
      this.runningTimeSubscription.unsubscribe();
    }
  }

  private handleCallEvent(callEvent: CallEvent) {
    this.stopRinger();
    this.stopTrackingRunningTime();
    switch (callEvent.type) {
      case 'incoming':
        this.ringer.play();
        this.handleIncomingCall(callEvent.sipEvent);
        break;
      case 'connected':
        this.startTrackingRunningTime();
        this.setState('in-call');
        break;
      case 'ended':
        this.closeAndReset();
        break;
      case 'initiate':
        this.initiateSoftphoneCall(callEvent.sipEvent['phoneNumber']);
        break;
      case 'ringing':
        this.ringer.play();
        break;
    }
  }

  private lookupTeamMember() {
    this.teamMember = this.groupService.getMemberByPhone(this.phoneNumber);
    if (this.teamMember) {
      this.callerName = this.teamMember.fullName;
    }
  }

  answerCall() {
    if (this.currentCall) {
      this.currentCall.answer();
      this.setState('in-call');
    }
  }

}
