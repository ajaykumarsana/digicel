export class MainLine {
    destination: string;
    receptionistUser: string;
    voicemailUser: string;

    constructor (sourceObject: Object) {
        this.destination = sourceObject['destination'] || '';
        this.receptionistUser = sourceObject['receptionistUser'] || '';
        this.voicemailUser = sourceObject['voicemailUser'] || '';
    }
}

