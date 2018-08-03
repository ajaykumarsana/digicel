import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService, TeamService, ProspectTeamMember,
         ProspectCustomer, ProspectCustomerService, SignUpFlowService,
         ProvisioningFlowService, OrderService, CatalogService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public pageTitle: string;
  public pageDescription: string;
  public pageClass: string;

  public deletableMembers: boolean;
  public displayMode: string;
  public includeDevices: boolean;
  public isPlacingOrder = false;

  public teamMembers: ProspectTeamMember[];
  public prospectCustomer: ProspectCustomer;
  public teamSize: number;
  public totalRecurring: string;
  public totalOTC: string;
  public orderTotal: string;
  public taxesRecurring: string;
  public taxesOTC: string;
  public feesRecurring: string;
  public feesOTC: string;
  public devicesRecurring: string;
  public devicesOTC: string;
  public devicesUnits: Array<any>;
  public linesUnits: Array<any>;
  public analogUnits: Array<any>;
  public portingLinesUnits: Array<any>;
  public companyName: string;
  public companyNumber: string;
  public companyNumbePrice: string;
  public userViewingSummary: boolean;
  public billingSummary = {};
  public editableTeam: boolean;
  public editableCompany: boolean;

  constructor(
    private router: Router,
    private teamService: TeamService,
    public suf: SignUpFlowService,
    public pfs: ProvisioningFlowService,
    public cms: CmsService,
    public orderService: OrderService,
    private prospectCustomerService: ProspectCustomerService,
    private catalog: CatalogService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('cartSummarySetupTitle'));
  }

  ngOnInit() {
    // Child Component Data - Sign up header
    this.pageTitle = this.cms.get('cartSummarySetupTitle');
    this.pageDescription = this.cms.get('cartSummarySetupDescription');
    this.pageClass = 'summary';

    // Child component data - team display
    this.teamMembers = this.teamService.team;
    this.deletableMembers = false;
    this.editableTeam = true;
    this.editableCompany = true;
    this.displayMode = 'price';
    this.includeDevices = true;

    // Team
    this.teamSize = this.teamMembers.length;

    // Company
    this.prospectCustomer = this.prospectCustomerService.prospectCustomer;
    this.companyName = this.prospectCustomer.company;
    this.companyNumber = this.prospectCustomer.phone;
    this.companyNumbePrice = this.catalog.getPrices().basePackage.monthly;
    this.calculateTotal();
  }

  setupBilling(): void {
      if (this.router.url.indexOf('/buyer/') !== -1) {
        this.router.navigate([this.suf.getNextStep()]);
      } else {
        this.checkout();
      }
  }

  // Processes payment and moves to summary screen
  checkout(): void {
    this.orderService.acceptTermsAndConditions = true;
    let order = this.orderService.orderSetup();
    this.isPlacingOrder = true;
    this.orderService.createOrder(order).subscribe(response => {
      if (this.router.url.indexOf('/buyer/') !== -1) {
        this.router.navigate([this.suf.getNextStep()]);
      } else {
        this.router.navigate([this.pfs.getNextStep()]);
      }
    }, err => {
      console.log(err);
      this.isPlacingOrder = false;
    });
  }

  calculateTotal(): void {
    let order = this.orderService.orderSetup();
    this.orderService.checkOrder(order).subscribe(response => {
      // @todo: integrate order preview object?
      this.feesRecurring = response.fees.recurring;
      this.feesOTC = response.fees.setup;
      this.devicesRecurring = response.devices.recurring;
      this.devicesOTC = response.devices.setup;
      this.devicesUnits = response.devices.units;
      this.linesUnits = response.lines.units;
      this.analogUnits = response.analogLines.units;
      this.taxesRecurring = response.taxes.recurring;
      this.taxesOTC = response.taxes.setup;
      this.totalRecurring = response.total.recurring;
      this.totalOTC = response.total.setup;
      this.portingLinesUnits = response.portingLines.units;

      let totalRecurring = parseFloat((response.total.recurring).substr(1));
      let totalOTCNumber = parseFloat((response.total.setup).substr(1));
      let grandTotal = totalOTCNumber + totalRecurring;
      this.orderTotal = '$' + grandTotal.toFixed(2);
    });
  }

  updateTeam(teamMember) {
    this.teamSize = this.teamMembers.length;
    this.calculateTotal();
  }

  showBilingSummary() {
    this.billingSummary = {
      companyName: this.companyName,
      companyNumber: this.companyNumber,
      companyNumbePrice: this.companyNumbePrice,
      prospectCustomer: this.prospectCustomer,
      feesRecurring: this.feesRecurring,
      feesOTC: this.feesOTC,
      devicesRecurring: this.devicesRecurring,
      devicesOTC: this.devicesOTC,
      devicesUnits: this.devicesUnits,
      linesUnits: this.linesUnits,
      analogUnits: this.analogUnits,
      portingLinesUnits: this.portingLinesUnits,
      taxesRecurring: this.taxesRecurring,
      taxesOTC: this.taxesOTC,
      totalRecurring: this.totalRecurring,
      totalOTC: this.totalOTC,
      orderTotal: this.orderTotal
    };

    if (this.billingSummary['companyNumbePrice'] === 0) {
      this.billingSummary['companyNumbePrice'] = this.cms.get('freeLabel');
    }
    this.userViewingSummary = true;
  }

  closeBillingSummaryPopup() {
    this.userViewingSummary = false;
  }

  previousStep() {
    if (this.router.url.indexOf('/buyer/') !== -1) {
      this.router.navigate([this.suf.getPreviousStep()]);
    } else {
      this.router.navigate([this.pfs.getPreviousStep()]);
    }
  }

  isBuyer(): boolean {
    if (this.router.url.indexOf('/buyer/') !== -1) {
      return true;
    } else {
      return false;
    }
  }

}
