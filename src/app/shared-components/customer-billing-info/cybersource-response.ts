import { PaymentErrors } from './payment-errors';
import { PaymentMetaData } from './payment-metadata';

export class CyberSourceResponse {
    action: string;
    reasonCode: string;
    reasonMessage?: string;
    decision?: string;
    token?: string;
    card_cardNumberLast4?: string;
    card_expirationMonth?: string;
    card_expirationYear?: string;
    maxPaymentAttemptsReached?: string;
    ccAuthReply_avsCode?: string;
    cardType?: string;
    missingFields_1?: string;
    missingFields_2?: string;
    missingFields_3?: string;
    invalidFields_1?: string;
    invalidFields_2?: string;
    invalidFields_3?: string;

    success: boolean;
    metaData: PaymentMetaData = new PaymentMetaData();
    errors: PaymentErrors = new PaymentErrors();

    constructor(responseObject) {
        Object.keys(responseObject).forEach(key => {
            this[key] = responseObject[key];
        });

        // 100 = Sucessful transaction
        // 652 = Requested additoin of an already existing instrument

        this.success = this.reasonCode === '100' || this.reasonCode === '652';

        if (this.success) {
            this.setMetaData();
         } else {
            this.checkErrors();
        }
    }

    setMetaData() {
        if (this.card_expirationMonth && this.card_expirationYear && this.card_cardNumberLast4) {
            this.metaData.exp = `${this.card_expirationMonth}/${this.card_expirationYear.slice(-2)}`;
            this.metaData.last4 = this.card_cardNumberLast4;
        }
    }

    checkErrors() {
        const  errorFields = [
            'missingFields_1',
            'missingFields_2',
            'missingFields_3',
            'invalidFields_1',
            'invalidFields_2',
            'invalidFields_3'
        ];

        for (let field of errorFields) {
            if (this[field] === 'card_accountNumber') {
                this.errors.numberError = 'Invalid value. Please check the credit card number and re-enter';
            } else if (this[field] === 'card_expirationDate' ) {
                this.errors.expError = 'Please enter a valid expiration date';
            } else if ( this[field] === 'card_cvNumber') {
                this.errors.securityCodeError = 'Please enter a valid security code';
            }
        }
    }

    getErrorMsg() {
        const messages = {
            '101': 'One or more required fields are missing. Please review and try again.',
            '102': 'One or more fields have invalid data. Please review and try again.',
            '104': 'There was a problem processing that card. Please try a different one.',
            '150': 'Oops, we had a problem. Please try again.',
            '151': 'Oops, we had a problem. Please try again.',
            '152': 'Oops, we had a problem. Please try again.',
            '200': 'Invalid address. Please check it and try again.',
            '201': 'Oops, we had a problem. Please try again.',
            '202': 'Invalid expiration date. Please check it and try again.',
            '203': 'There was a problem processing that card. Please try a different one.',
            '205': 'There was a problem processing that card. Please try a different one.',
            '207': 'Oops, we had a problem. Please try again later.',
            '208': 'There was a problem processing that card. Please try a different one.',
            '209': 'Invalid security code. Please check it and try again.',
            '211': 'Invalid security code. Please check it and try again.',
            '221': 'There was a problem processing that card. Please try a different one.',
            '230': 'We’ve identified a possible fraud flag. Please try a different card.',
            '231': 'There was a problem with that card number. Please check it and try again.',
            '232': 'We do not accept that type of card. Please use Visa, Mastercard, American Express, or Discover and try again.',
            '233': 'There was a problem processing that card. Please try a different one.',
            '234': 'There was a problem processing that card. Please try a different one.',
            '236': 'Oops, we had a problem. Please try again later.',
            '250': 'Oops, we had a problem. Please try again later.',
            '655': 'There was a problem processing that card. Please try a different one.',
            '657': 'There was a problem processing that card. Please try a different one.',
            '704': 'There was a problem processing that card. Please try a different one.',
            '706': 'Invalid card number. Please check it and try again.',
            '950': 'There was a problem processing that card. Please try a different one.',
            '951': 'Oops, we had a problem. Please try again later.',
            '994': 'There was a problem processing that card. Please try a different one.',
            '998': 'There was a problem processing that card. Please try a different one.',
            'expired': 'That card is expired. Please update and try again.'
        };
        return messages[this.reasonCode];
    }
}
