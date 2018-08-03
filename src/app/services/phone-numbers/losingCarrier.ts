export class LosingCarrier {
    public LosingCarrierSPID: string;
    public LosingCarrierAccountNumberRequired: string;
    public LosingCarrierName: string;
    public LosingCarrierIsWireless: string;
    public LosingCarrierMinimumPortingInterval: string;

    constructor (sourceObject: Object) {
        this.LosingCarrierSPID = sourceObject['LosingCarrierSPID'] || '';
        this.LosingCarrierAccountNumberRequired = sourceObject['LosingCarrierAccountNumberRequired'] || '';
        this.LosingCarrierName = sourceObject['LosingCarrierName'] || '';
        this.LosingCarrierIsWireless = sourceObject['LosingCarrierIsWireless'] || '';
        this.LosingCarrierMinimumPortingInterval = sourceObject['LosingCarrierMinimumPortingInterval'] || '';
    }
}
