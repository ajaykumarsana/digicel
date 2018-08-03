export class EnterpiseLevelAddOns {
    autoAttendant: 'available'|'not_available'|'optional';
    huntGroups: boolean;
    callParkAndPickUp: boolean;
    onHoldMessaging: boolean;

    constructor (sourceObject: Object) {
        this.autoAttendant = sourceObject['enterpiautoAttendanteLevelAddOns'] || 'not_available';
        this.huntGroups = sourceObject['huntGroups'] || false;
        this.callParkAndPickUp = sourceObject['callParkAndPickUp'] || false;
        this.onHoldMessaging = sourceObject['onHoldMessaging'] || false;
    }
}
