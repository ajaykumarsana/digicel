import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { DialablePhonePipe, PhonePipe } from 'pipes';
import { CmsService } from '../cms';
import { SipConfig } from './sip-config';
import { CallEvent } from './call-event';
import { addEventHandlers } from '../utility-methods';
import { SipSession } from './sip-session';
import { CallType } from './call-type';

declare const ExSIP: any;

@Injectable()
export class CallingService {
  callingEnabled = true;
  ua: any;
  session: any;
  getRunningTime: () => string;
  outgoingCall: any;
  sipConfig: SipConfig;
  callEvents: Subject<CallEvent> = new Subject();

  constructor(private cms: CmsService) { }

  initialize(sipConfig: SipConfig) {
    this.sipConfig = sipConfig;
    if (this.sipConfig.ws_servers.length === 0) {
      this.callingEnabled = false;
      return;
    }
    this.ua = new ExSIP.UA(this.sipConfig);
    this.ua.setRtcMediaHandlerOptions({
      reuseLocalMedia: false,
      disableICE: true,
      RTCConstraints: {
        optional: [{ DtlsSrtpKeyAgreement: true }],
        mandatory: {}
      }
    });
    addEventHandlers(this.ua, this.sipHandlers());
    this.ua.start();
  }

  shutDown() {
    this.terminateSession();
    if (this.ua) {
      this.ua.stop();
    }
  }

  muteLocalStream() {
    this.enableOrDisableAudioStream('disable', 'local');
  }

  unmuteLocalStream() {
    this.enableOrDisableAudioStream('enable', 'local');
  }

  initiateSoftphoneCall(phoneNumber: string) {
    this.callEvents.next({ type: 'initiate', sipEvent: { phoneNumber: phoneNumber } });
  }

  terminateSession() {
    if (this.session) {
      try {
        this.session.terminate();
        this.session.close();
        console.log('Session Closed');
      } catch (error) {
        console.warn(error);
      }
      this.session = null;
      this.getRunningTime = null;
    }
  }

  call(phoneNumber: string) {
    const pipe = new DialablePhonePipe(this.cms);
    const dialablePhoneNumber = pipe.transform(phoneNumber);
    const callOptions = this.getCallOptions(false);
    this.outgoingCall = this.ua.call(`sip:${dialablePhoneNumber}@${this.sipConfig.host}`, callOptions);
  }

  sendDTMF(symbol: string) {
    this.session.sendDTMF(symbol, {
      duration: 100,
      interToneGap: 100
    });
  }

  private getCallOptions(isVideoEnabled = false): {} {
    return {
      mediaConstraints: { audio: true, video: isVideoEnabled },
      createOfferConstraints: {
        mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: isVideoEnabled }
      }
    };
  }

  private handleNewSession(event) {
    const callType: CallType = event.data.originator === 'remote' ? 'incoming' : 'outgoing';
    const session = event.data.session;
    const sipSession = new SipSession(session, callType, this);
    this.session = sipSession.session;
    this.getRunningTime = sipSession.getRunningTime.bind(sipSession);

    event.hangup = () => this.terminateSession();
    event.answer = () => this.session.answer(this.getCallOptions());

    if (callType === 'incoming') {
      this.callEvents.next({ type: 'incoming', sipEvent: event });
    }
  }

  private sipHandlers(): {} {
    return {
      newRTCSession: e => this.handleNewSession(e),

      registrationFailed: function (e) {
        console.log('Registration failed', e);
      },

      onReInvite: function (e) {
        console.log('ReInvite', e);
        e.data.session.acceptReInvite();
      }
    };
  }

  private enableOrDisableAudioStream(action: 'enable' | 'disable', stream: 'local' | 'remote') {
    if (this.session) {
      let sessionStream;
      if (stream === 'local') {
        sessionStream = this.session.getLocalStreams()[0];
      } else {
        sessionStream = this.session.getRemoteStreams()[0];
      }
      if (sessionStream) {
        const audioTrack = sessionStream.getAudioTracks()[0];
        audioTrack.enabled = action === 'enable';
      }
    }
  }

}
