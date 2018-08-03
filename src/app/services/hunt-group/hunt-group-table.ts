import { HuntGroupObject } from './hunt-group-object';
import { HuntGroup } from './hunt-group';

export class HuntGroupTable {
    huntGroupTable: HuntGroupObject[] = [];

    constructor (sourceObject: HuntGroupObject[]) {
        let huntGroupArray = [];
        for (let [key, control] of Object.entries(sourceObject['huntGroups'])) {
            let huntGroup = {
                huntGroup: null,
                huntGroupName: null
            };
            huntGroup.huntGroupName = sourceObject['huntGroups'][key].huntGroupName;
            huntGroup.huntGroup = new HuntGroup(sourceObject['huntGroups'][key]);
            let sourceObjectEntry = new HuntGroupObject(huntGroup);
            huntGroupArray.push(sourceObjectEntry);
        }

        // sort by name
        huntGroupArray.sort(function(a, b) {
            let aHuntGroupName = a.huntGroupName.toUpperCase(); // ignore upper and lowercase
            let bHuntGroupName = b.huntGroupName.toUpperCase(); // ignore upper and lowercase
            if (aHuntGroupName < bHuntGroupName) {
                return -1;
            }
            if (aHuntGroupName > bHuntGroupName) {
                return 1;
            }
            // names must be equal
            return 0;
            });
        this.huntGroupTable = huntGroupArray;
    }
}
