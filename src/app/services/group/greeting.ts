export class Greeting {
    autoAttendant: string;
    voicemail: string;

    constructor (sourceObject: Object) {
        this.autoAttendant = sourceObject['autoAttendant'] || '';
        this.voicemail = sourceObject['voicemail'] || '';
    }
}

