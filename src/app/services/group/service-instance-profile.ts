export class ServiceInstanceProfile {
    alias: [any];
    callingLineIdFirstName: string;
    callingLineIdLastName: string;
    callingLineIdPhoneNumber: string;
    countryCode: string;
    department: any;
    extension: string;
    hiraganaFirstName: string;
    hiraganaLastName: string;
    language: string;
    name: string;
    nationalPrefix: any;
    phoneNumber: string;
    publicUserIdentity: any;
    timeZone: string;
    timeZoneDisplayName: string;

    constructor (sourceObject: Object) {
        this.alias = sourceObject['alias'] || [];
        this.callingLineIdFirstName = sourceObject['callingLineIdFirstName'] || '';
        this.callingLineIdPhoneNumber = sourceObject['callingLineIdPhoneNumber'] || '';
        this.countryCode = sourceObject['countryCode'] || '';
        this.department = sourceObject['department'] || null;
        this.extension = sourceObject['extension'] || '';
        this.hiraganaFirstName = sourceObject['hiraganaFirstName'] || '';
        this.hiraganaLastName = sourceObject['hiraganaLastName'] || '';
        this.language = sourceObject['language'] || '';
        this.name = sourceObject['name'] || '';
        this.nationalPrefix = sourceObject['nationalPrefix'] || null;
        this.phoneNumber = sourceObject['phoneNumber'] || '';
        this.publicUserIdentity = sourceObject['publicUserIdentity'] || null;
        this.timeZone = sourceObject['timeZone'] || '';
        this.timeZoneDisplayName = sourceObject['timeZoneDisplayName'] || '';
    }
}

