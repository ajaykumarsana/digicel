export class UserLevelVoiceFatures {
    doNotDisturb: boolean;
    callWaiting: boolean;
    callForwardingConditional: 'always'|'busy'|'not_reachable'|'no_answer';
    callTransfer: boolean;
    anonymousCallRejection: boolean;
    callForwardWithSchedule: boolean;
    busyLampField: boolean;
    customRingback: boolean;
    selectiveCallAcceptanceRejection: boolean;

    constructor (sourceObject: Object) {
        this.doNotDisturb = sourceObject['doNotDisturb'] || false;
        this.callWaiting = sourceObject['callWaiting'] || false;
        this.callForwardingConditional = sourceObject['callForwardingConditional'] || 'not_reachable';
        this.callTransfer = sourceObject['callTransfer'] || false;
        this.anonymousCallRejection = sourceObject['anonymousCallRejection'] || false;
        this.callForwardWithSchedule = sourceObject['callForwardWithSchedule'] || false;
        this.busyLampField = sourceObject['busyLampField'] || false;
        this.customRingback = sourceObject['customRingback'] || false;
        this.selectiveCallAcceptanceRejection = sourceObject['selectiveCallAcceptanceRejection'] || false;
    }
}
