import { Price } from './price';

export interface Service {
    analogLine: Price;
    basePackage: Price;
    standardLine: Price;
    porting: Price;
}
