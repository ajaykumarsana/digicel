import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService, CatalogService, Catalog, Product, ProspectTeamMember } from 'services';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  catalog: Catalog;
  @Input() popup = true;
  @Input() teamMember: ProspectTeamMember;
  @Input() selectedDevice: Product;
  @Output() onDeviceSelected = new EventEmitter<Product>();
  @Output() onDeviceRemoved = new EventEmitter<Product>();

  constructor(public cms: CmsService, private catalogService: CatalogService) { }

  ngOnInit() {
    this.catalogService.getCatalog().subscribe(catalog => {
      this.catalog = catalog;
    });
  }

  selectDevice(device: Product) {
    this.onDeviceSelected.emit(device);
  }

  removeDevice(device: Product) {
    this.onDeviceRemoved.emit(device);
  }
}
