export class UserLevelAddOns {
    onlinePortalForEndUser: boolean;
    mobileTabletPCApp: boolean;
    multipleDevicesPerUser: boolean;

    constructor (sourceObject: Object) {
        this.onlinePortalForEndUser = sourceObject['onlinePortalForEndUser'] || false;
        this.mobileTabletPCApp = sourceObject['mobileTabletPCApp'] || false;
        this.multipleDevicesPerUser = sourceObject['multipleDevicesPerUser'] || false;
    }
}
