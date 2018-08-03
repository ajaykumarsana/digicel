export class CyberSourceRequest {
    action = 'submit';
    billTo_firstName: string;
    billTo_lastName: string;
    billTo_street1: string;
    billTo_street2: string;
    billTo_city: string;
    billTo_state: string;
    billTo_postalCode: string;
    billTo_country = 'US';

    constructor(
        billingFirstName: string,
        billingLastname: string,
        billingStreet1: string,
        billingStreet2: string,
        billingCity: string,
        billingState: string,
        billingPostalCode: string,
        billingCountry?: string
    ) {
        this.billTo_firstName = billingFirstName || '';
        this.billTo_lastName = billingLastname || '';
        this.billTo_street1 = billingStreet1 || '';
        this.billTo_street2 = billingStreet2 || '';
        this.billTo_city = billingCity || '';
        this.billTo_state = billingState || '';
        this.billTo_postalCode = billingPostalCode || '';

        if (billingCountry) {
            this.billTo_country = billingCountry;
        }

    }
}
