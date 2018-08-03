import { AfterHoursMenu } from './after-hours-menu';
import { Announcement } from '../auto-attendant/announcement';
import { BusinessHoursMenu } from './business-hours-menu';
import { HolidayMenu } from './holiday-menu';
import { ServiceInstanceProfile } from './service-instance-profile';

export class Attendant {
    afterHoursMenu: AfterHoursMenu;
    announcements: Announcement;
    autoAttendantId: string;
    businessHours: any;
    businessHoursMenu: BusinessHoursMenu;
    debugInfo: any;
    echo: string;
    enableVideo: boolean;
    extensionDialingScope: string;
    firstDigitTimeoutSeconds: number;
    holidayMenu: HolidayMenu;
    holidaySchedule: any;
    nameDialingEntries: string;
    nameDialingScope: string;
    networkClassOfService: any;
    serviceInstanceProfile: ServiceInstanceProfile;
    type: string;


    constructor (sourceObject: Object) {
        this.afterHoursMenu = sourceObject['afterHoursMenu'] || {};
        this.announcements = sourceObject['announcements'] || {};
        this.autoAttendantId = sourceObject['autoAttendantId'] || '';
        this.businessHours = sourceObject['businessHours'] || null;
        this.businessHoursMenu = sourceObject['businessHoursMenu'] || {};
        this.debugInfo = sourceObject['debugInfo'] || null;
        this.echo = sourceObject['echo'] || '';
        this.enableVideo = sourceObject['enableVideo'] || false;
        this.extensionDialingScope = sourceObject['extensionDialingScope'] || '';
        this.firstDigitTimeoutSeconds = sourceObject['firstDigitTimeoutSeconds'] || 10;
        this.holidayMenu = sourceObject['holidayMenu'] || {};
        this.holidaySchedule = sourceObject['holidaySchedule'] || null;
        this.nameDialingEntries = sourceObject['nameDialingEntries'] || '';
        this.networkClassOfService = sourceObject['networkClassOfService'] || null;
        this.serviceInstanceProfile = sourceObject['serviceInstanceProfile'] || {};
        this.type = sourceObject['type'] || '';
    }
}

