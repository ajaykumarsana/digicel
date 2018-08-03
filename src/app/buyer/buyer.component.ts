import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService, CatalogService } from 'services';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuyerComponent implements OnInit {

  constructor(public cms: CmsService, private catalog: CatalogService) {
  }

  ngOnInit() {
    this.catalog.getCatalog().subscribe();
  }

}
