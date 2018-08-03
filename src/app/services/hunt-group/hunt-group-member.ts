export class HuntGroupMember {
    public extension: string;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public userId: string;

    constructor (sourceObject: Object) {
        this.extension = sourceObject['extension'] || '';
        this.firstName = sourceObject['firstName'] || '';
        this.lastName = sourceObject['lastName'] || '';
        this.phoneNumber = sourceObject['phoneNumber'] || '';
        this.userId = sourceObject['userId'] || '';
    }
}
