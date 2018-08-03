import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService, CatalogService } from 'services';

@Component({
  selector: 'app-provisioning',
  templateUrl: './provisioning.component.html',
  styleUrls: ['./provisioning.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvisioningComponent implements OnInit {

  constructor(public cms: CmsService, private catalog: CatalogService) {
  }

  ngOnInit() {
    this.catalog.getCatalog().subscribe();
  }

}
