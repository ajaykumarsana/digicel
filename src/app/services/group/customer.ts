import { IAddress } from 'interfaces';
import { PaymentInstrument } from '../../shared-components/customer-billing-info/payment-instrument';

export class Customer {
    firstName: string;
    lastName: string;
    serviceAddress: IAddress;
    shippingAddress: IAddress;
    billingAddress: IAddress;
    paymentInstrument: PaymentInstrument;

    constructor (sourceObject: Object) {
        this.firstName = sourceObject['firstName'] || '';
        this.lastName = sourceObject['lastname'] || '';
        this.serviceAddress = sourceObject['serviceAddress'];
        this.shippingAddress = sourceObject['shippingAddress'];
        this.billingAddress = sourceObject['billingAddress'];
        this.paymentInstrument = new PaymentInstrument(sourceObject['paymentInstrument']);
    }
}

