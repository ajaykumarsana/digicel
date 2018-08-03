import { Component, OnInit, Input } from '@angular/core';
import { ProspectCustomer, ProspectCustomerService, CmsService, CatalogService } from 'services';

@Component({
  selector: 'app-company-display',
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.scss']
})
export class CompanyDisplayComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showPrice = true;
  @Input() editable = false;

  public companyName: string;
  public companyNumber: string;
  public price: string;

  constructor(
    public prospectCustomerService: ProspectCustomerService,
    public cms: CmsService,
    private catalog: CatalogService
  ) { }

  ngOnInit() {
    const prospectCustomer = this.prospectCustomerService.prospectCustomer;
    this.companyName = prospectCustomer.company;
    this.companyNumber = prospectCustomer.phone;
    this.price = this.catalog.getPrices().basePackage.monthly;
  }

}
