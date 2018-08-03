import { KeyConfigurationObject } from './key-configuration';
import { Announcement } from './announcement';

export class AutoAttendant {
    autoAttendantId: string;
    extension: string;
    phoneNumber: string;
    timezone: string;
    language: string;
    enableVideo: boolean;
    menu: KeyConfigurationObject[];
    anouncement: string;
    anouncements: Announcement[];

    constructor (sourceObject: Object) {
        this.anouncement = sourceObject['anouncement'] || '';
        this.anouncements = sourceObject['anouncements'] || [];
        this.autoAttendantId = sourceObject['autoAttendantId'] || '';
        this.enableVideo = sourceObject['enableVideo'] || false;
        this.extension = sourceObject['extension'] || '';
        this.language = sourceObject['language'] || '';
        this.menu = sourceObject['menu'] || [];
        this.phoneNumber = sourceObject['phoneNumber'] || '';
        this.timezone = sourceObject['timezone'] || '';

    }
}

