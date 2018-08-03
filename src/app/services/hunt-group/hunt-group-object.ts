import { HuntGroup } from './hunt-group';

export class HuntGroupObject  {
    huntGroupName: string;
    huntGroup: HuntGroup;
    open: boolean;

    constructor( sourceObject: Object ) {
        this.huntGroupName = sourceObject['huntGroupName'] || '';
        this.huntGroup = sourceObject['huntGroup'] || '';
    }

}
