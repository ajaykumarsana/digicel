import { CreditCard } from './credit-card';

export class PaymentInstrument {
    public card: CreditCard;
    public paymentToken: string;

    constructor(responseObject) {
        if (responseObject && responseObject['paymentToken']) {
            this.paymentToken = responseObject['paymentToken'];
            if (responseObject['card']) {
                this.card = new CreditCard(responseObject['card']);
            }
        }
    }
}
