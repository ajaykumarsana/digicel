import { LosingCarrier } from './losingCarrier';
import { RateCenter } from './rateCenter';

export class Portability {
    public carrierName: string;
    public engine: string;
    public loaRequiredFields: [string];
    public losingCarrier: LosingCarrier;
    public phoneNumber: string;
    public rateCenter: RateCenter;
    public supported: string;

    constructor (sourceObject: Object) {
        this.carrierName = sourceObject['carrierName'] || '';
        this.engine = sourceObject['engine'] || '';
        this.loaRequiredFields = sourceObject['loaRequiredFields'] || [];
        this.losingCarrier = sourceObject['losingCarrier'] || {};
        this.phoneNumber = sourceObject['phoneNumber'] || '';
        this.rateCenter = sourceObject['rateCenter'] || {};
        this.supported = sourceObject['supported'] || '';
    }
}
