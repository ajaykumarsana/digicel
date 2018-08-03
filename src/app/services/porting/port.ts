// import { Device } from '../catalog/device';
import { IAddress } from 'interfaces';

export class Port {
    public temporaryPhoneNumber: string;
    public portingPhoneNumber: string;
    public billingTelephoneNumber: string;
    public businessName?: string;
    public accountAddress: IAddress;
    public authorizingName: string;
    public accountNumber?: string;
    public accountPIN?: string;
    public status?: string;
    public complete: boolean;
    public isCompany: boolean;

    constructor(dataObj) {
        this.temporaryPhoneNumber = dataObj['temporaryPhoneNumber'];
        this.portingPhoneNumber = dataObj['portingPhoneNumber'];
        this.billingTelephoneNumber = dataObj['billingTelephoneNumber'];
        this.businessName = dataObj['businessName'] || null;
        this.accountAddress = dataObj['accountAddress'];
        this.authorizingName = dataObj['authorizingName'];
        this.accountNumber = dataObj['accountNumber'] || null;
        this.accountPIN = dataObj['accountPIN'] || null;
        this.status = dataObj['status'] || null;
        this.complete = dataObj['complete'];
        this.isCompany = dataObj['isCompany'];
    }

}
