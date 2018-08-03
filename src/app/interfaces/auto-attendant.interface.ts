import { IAutoAttendantMenuItem } from './auto-attendant-menu-item.interface';

export interface IAutoAttendant {
    menuItems: Array<IAutoAttendantMenuItem>;
    keyMappings: any;
}
