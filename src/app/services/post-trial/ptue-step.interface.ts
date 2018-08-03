export interface PTUEStepInterface {
    sectionIndex: number;
    section: string;
    key?: string;
    url: string;
    name: string;
    headerStyle?: 'standard' | 'image';
    iconClass?: 'porting' | 'device' | 'cart' | 'terms';
}
