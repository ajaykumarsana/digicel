import { IAddress } from 'interfaces';

export class CreditCard {
    public cardType: string;
    public billingAddress: IAddress;
    public cardNumberLast4: string;
    public expDate: string;

    constructor(responseObj) {
        this.cardType = responseObj['cardType'];
        this.billingAddress = responseObj['billingAddress'];
        this.cardNumberLast4 = responseObj['cardNumberLast4'];
        this.expDate = this.formatExp(responseObj['expiryDate']);
    }

    private formatExp(expiryDate): string {
        if (expiryDate) {
            let [year, month] = expiryDate.split('-');
            return `${month}/${year.slice(-2)}`;
        } else {
            return '';
        }
    }
}
