export class RateCenter {
    public LATA: string;
    public City: string;
    public RateCenter: string;
    public State: string;

    constructor (sourceObject: Object) {
        this.LATA = sourceObject['LATA'] || '';
        this.City = sourceObject['City'] || '';
        this.RateCenter = sourceObject['RateCenter'] || '';
        this.State = sourceObject['State'] || '';
    }
}
