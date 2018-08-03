import { IAutoAttendant, IAutoAttendantMenuItem } from 'interfaces';

export class OldAutoAttendant implements IAutoAttendant {
    public menuItems: Array<IAutoAttendantMenuItem>;
    public keyMappings: any;

    constructor() {
        this.menuItems = [];
    }
}
