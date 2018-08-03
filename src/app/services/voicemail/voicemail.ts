import { CallingPartyInfo } from './callingPartyInfo';
import * as moment from 'moment';

export class Voicemail {
    duration: string;
    telephoneNumber: string;
    unread: boolean;
    mediaUrl: string;
    messageId: string;
    callingPartyInfo?: CallingPartyInfo;
    callerId: string;
    time: string;

    constructor (sourceObject: Object) {
        this.duration = sourceObject['duration'] || '';
        this.telephoneNumber = sourceObject['telephoneNumber'] || '';
        this.unread = sourceObject['unread'] || false;
        this.mediaUrl = sourceObject['mediaUrl'] || '';
        this.messageId = sourceObject['messageId'] || '';
        this.callingPartyInfo = sourceObject['callingPartyInfo'] || {};
        this.callerId = sourceObject['callerId'] || '';
        this.time = sourceObject['time'] || '';
    }
}
