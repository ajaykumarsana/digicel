export class PortStatus {
    public status: string;
    public engine: string;
    public orderId: string;

    constructor (sourceObject: Object) {
        this.status = sourceObject['extension'] || '';
        this.engine = sourceObject['huntGroupId'] || '';
        this.orderId = sourceObject['huntGroupName'] || '';
    }
}
