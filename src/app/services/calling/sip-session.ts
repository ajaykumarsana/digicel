import { padStart } from 'lodash';
import { addEventHandlers } from '../utility-methods';
import { CallingService } from './calling.service';
import { CallType } from './call-type';

export class SipSession {
  session: any;
  private callingService: CallingService;
  private initiationTime: number;

  constructor(session: any, callType: CallType, callingService: CallingService) {
    this.callingService = callingService;
    this.session = session;
    addEventHandlers(this.session, this.sessionBindings(callType));
  }

  getRunningTime(): string {
    if (!this.initiationTime) {
      return '';
    }
    const ms = Date.now() - this.initiationTime;
    const seconds = Math.round(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${mins}:${padStart(remainderSeconds.toString(), 2, '0')}`;
  }

  private sessionBindings(callType: CallType) {
    return {
      failed: event => {
        this.sessionBindings(callType).ended(event);
      },

      progress: event => {
        if (callType === 'outgoing') {
          this.callingService.callEvents.next({type: 'ringing'});
        }
      },

      started: event => {
        this.initiationTime = Date.now();
        const remoteStream = this.session.getRemoteStreams()[0];
        this.getRemoteMediaElement().srcObject = remoteStream;
        this.callingService.callEvents.next({type: 'connected', sipEvent: event});
      },

      ended: event => {
        this.callingService.callEvents.next({type: 'ended', sipEvent: event});
        this.session = null;
      },

      held: event => {
        console.log('held', event);
      },

      resumed: event => {
        console.log('resumed', event);
      }
    };
  }

  private getRemoteMediaElement(): any {
    return document.getElementById('remote-media');
  }
}
