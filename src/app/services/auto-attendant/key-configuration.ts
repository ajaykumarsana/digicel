import { Entry } from './entry';

export class KeyConfigurationObject {
    entry: Entry;
    key: string;

    constructor (sourceObject: Object) {
        this.entry = sourceObject['entry'] || {};
        this.key = sourceObject['key'] || '';
    }
}
