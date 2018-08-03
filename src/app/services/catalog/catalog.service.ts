import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { Catalog } from './catalog';
import { Service } from './service';
import { Product } from './product';


@Injectable()
export class CatalogService {
  serviceProviderId: string;
  catalog: Catalog;

  constructor(private apiService: ApiService, private cms: CmsService) {
    this.serviceProviderId = this.cms.getEngine();
    this.catalog = JSON.parse(sessionStorage.getItem('catalog'));
  }

  getCatalog(): Observable<Catalog> {
    if (this.catalog && this.catalog.products.length > 0) {
      return Observable.of(this.catalog);
    } else {
      const path = `${this.serviceProviderId}/order/catalog`;
      return this.apiService.call('speed', 'get', path)
        .map(catalog => {
          sessionStorage.setItem('catalog', JSON.stringify(catalog));
          return this.catalog = catalog;
        });
    }
  }

  getPrices(): Service {
    return this.catalog ? this.catalog.services : null;
  }

  getProducts(): Product[] {
    return this.catalog ? this.catalog.products : null;
  }

}
