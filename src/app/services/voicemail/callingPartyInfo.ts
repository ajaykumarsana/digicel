export class CallingPartyInfo {
    address: string;
    name: string;
    userId?: string;

    constructor (sourceObject: Object) {
        this.address = sourceObject['address'] || '';
        this.name = sourceObject['name'] || '';
        this.userId = sourceObject['userId'] || '';

    }
}
