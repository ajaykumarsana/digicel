import { Product } from './product';
import { Download } from './download';
import { Service } from './service';

export interface Catalog {
    products: Product[];
    services?: Service;
    downloads?: Download[];
}
