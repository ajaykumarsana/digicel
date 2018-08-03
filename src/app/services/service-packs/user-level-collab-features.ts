export class UserLevelCollabFeatures {
    instantMessaging: boolean;
    presence: boolean;
    myRoom: boolean;
    desktopSharing: boolean;
    callPull: boolean;
    videoConferencing: boolean;
    multiConference: '3Way'|'nWay';
    meetmeConference: boolean;

    constructor (sourceObject: Object) {
        this.instantMessaging = sourceObject['instantMessaging'] || false;
        this.presence = sourceObject['presence'] || false;
        this.myRoom = sourceObject['myRoom'] || false;
        this.desktopSharing = sourceObject['desktopSharing'] || false;
        this.callPull = sourceObject['callPull'] || false;
        this.videoConferencing = sourceObject['videoConferencing'] || false;
        this.multiConference = sourceObject['multiConference'] || '3Way';
        this.meetmeConference = sourceObject['meetmeConference'] || false;
    }
}
