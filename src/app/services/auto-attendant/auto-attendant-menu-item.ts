import { IAutoAttendantMenuItem } from 'interfaces';

export class AutoAttendantMenuItem implements IAutoAttendantMenuItem {
    public action;
    public description: string;
    public key: string;
    public phoneNumber: string; // this is the extension value

    constructor(menuItem: IAutoAttendantMenuItem) {
        this.action = menuItem.action;
        this.description = menuItem.description;
        this.key = menuItem.key || null;

        if (menuItem.phoneNumber) {
            this.phoneNumber = menuItem.phoneNumber;
        }
    }
}
