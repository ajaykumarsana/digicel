import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService, UserService, GroupService, ProspectTeamMember, TeamService, OrderService, Order, ProspectCustomer } from 'services';
import { Port, PortingService } from 'services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public newTeamMembers: Array<any>;
  public existingTeamMembers: Array<any>;
  public users: Array<any>;
  public linePrice: string;
  public openBillSummary = false;
  public billingSummary = {};

  public companyName: string;
  public companyNumber: string;
  public companyNumbePrice: string;
  public prospectCustomer: string;
  public feesRecurring: string;
  public feesOTC: string;
  public devicesRecurring: string;
  public devicesOTC: string;
  public devicesUnits: string;
  public linesUnits: string;
  public analogUnits: string;
  public portingLinesUnits: string;
  public taxesRecurring: string;
  public taxesOTC:  string;
  public totalRecurring: string;
  public totalOTC:  string;
  public orderTotal: string;
  public order: Order;
  public serviceProviderId: string;

  public userViewingSummary: boolean;
  public editableTeam: boolean;
  public editableCompany: boolean;

  public ports: Array<Port>;

  constructor(
    public router: Router,
    public cms: CmsService,
    public user: UserService,
    public group: GroupService,
    public team: TeamService,
    public orderService: OrderService,
    public port: PortingService
  ) {

    this.serviceProviderId = this.cms.getEngine();
    this.ports = [];
  }

  ngOnInit() {
    this.linePrice = this.cms.getFromProvider('linePrice');
    this.companyNumber = this.user.user.phoneNumber;
    this.newTeamMembers = this.team.team;
    this.existingTeamMembers = this.team.existingTeam;
    this.users = [
      { new: false,
        users: this.existingTeamMembers
      },
      { new: true,
        users: this.newTeamMembers
      }
    ];

    this.ports = this.port.getLocalPortRequests('new');


    // We need prospectCustomer object for the current order service, so hacky making prospect customer object
    // This whole things needs a restructure, once we have more solid requirements around rialto - michelle
    let wholeTeam = this.existingTeamMembers.concat(this.newTeamMembers);
    let prospectUser: ProspectCustomer = new ProspectCustomer({
      firstName: this.user.user.firstName,
      lastName: this.user.user.lastName,
      company: this.group.group.groupName,
      companyAddress: this.user.user.shippingAddress,
      phone: this.group.group.phoneNumber,
      // areaCode: this.
      email: this.user.user.email,
      // autoAttendantPhone = this.group.group.autoAttendant,
      // callQueuePhone: this.group.group.hunt
      // voiceMessagingPhone
      // faxNumber
      portingPhoneNumber: null
    });
    this.order = this.orderService.orderSetup(prospectUser, wholeTeam);
    this.orderService.checkOrder(this.order).subscribe(response => {
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

  nextPage() {
    // dont kow what the behavior should be

    this.port.createPortRequests(this.ports).subscribe(response => {
      console.log(response);
    });

  }

  previousPage() {
    // go back to team
    this.router.navigate(['group-level/team']);
  }

  openBillingSummary() {
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
    this.openBillSummary = true;
  }

  closeBillingSummary() {
    this.openBillSummary = false;
  }

  toggleBillingSummary() {
    // NEED  TO ADD CODE TO CALL THE OPEN AND CLOSE FROM HERE AS NEEDED
    this.openBillSummary = !this.openBillSummary;
  }

  getTermsAndConditionsLink() {
    let linkObj = this.cms.getFromProvider('buyerTermsAndConditionsLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }
}
