import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CmsService, SignUpFlowService, ProvisioningFlowService, ProspectCustomerService, ProspectCustomer, CatalogService,
  FormValidationService, extractAreaCode, PhoneNumbersService, TeamService, ProspectTeamMember, PortingService
} from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {

  // For Sign up nav component
  public pageTitle: string;
  public pageDescription: string;
  public pageClass = 'phone';

  public isPort: boolean;
  public portingFlow: boolean;
  public prospectCustomer: ProspectCustomer;
  public member: ProspectTeamMember;

  // Error Handling
  public newNumberErrorMessage: string; // only new number errors
  public portErrorMessage: string; // only buyer-porting errors

  public checkFax: boolean;
  public portingPhone: string;
  public isNumberPortable = false;
  public portingPrice: string;
  // Disabling fax lines for the demo
  public enableFax = false;

  constructor(
    private router: Router,
    public suf: SignUpFlowService,
    public pfs: ProvisioningFlowService,
    public cms: CmsService,
    private prospectCustomerService: ProspectCustomerService,
    private teamService: TeamService,
    private catalogService: CatalogService,
    private formValidationService: FormValidationService,
    private phoneNumberService: PhoneNumbersService,
    private portingService: PortingService,
    private aRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.portingFlow = !aRoute.snapshot.data.noPort;
    this.titleService.setTitle(this.cms.get('phoneSetupTitle'));
  }

  ngOnInit() {
    this.pageTitle = this.cms.get('phoneSetupTitle');
    this.pageDescription = this.cms.get('phoneSetupDescription', this.prospectCustomerService.prospectCustomer.company);
    this.catalogService.getCatalog().subscribe(catalog => {
      this.portingPrice = catalog.services.porting.setup;
    });
    this.prospectCustomer = this.prospectCustomerService.prospectCustomer;
    if (this.teamService.team.length === 0  &&
      this.prospectCustomerService.prospectCustomer.mainUser === true &&
      this.prospectCustomerService.prospectCustomer.email ) {
      this.addMember(this.prospectCustomerService.prospectCustomer);
    }
    this.member = this.teamService.team[0];
    this.isPort = this.prospectCustomerService.isPorting();
    // The covers the scenario where a user returns to this page after saving a portingNumber
    if (this.prospectCustomer.portingPhoneNumber) {
      this.portingPhone = this.prospectCustomer.portingPhoneNumber;
      this.isNumberPortable = true;
    }
  }

  addMember(customer: ProspectCustomer) {
    this.teamService.addTeamMemberByObject(new ProspectTeamMember({
      fullName: customer.fullName,
      email: customer.email,
      device: null,
      id: null,
      phone: null
    }));
  }

  // Starting a new phone number search so we need to clean this out
  clearPhoneNumbersInStorage() {
    sessionStorage.removeItem('phones');
    this.prospectCustomerService.availablePhoneNumbers = [];
    this.phoneNumberService.phoneNumbers = [];
  }

  // Searches for a phone number
  searchPhoneNumber(portNumber?: string): void {
    this.clearPhoneNumbersInStorage();
    this.newNumberErrorMessage = null;
    this.prospectCustomer.phone = null;
    this.prospectCustomerService.generatePhoneNumbers().subscribe((phoneNumbers) => {
      this.prospectCustomerService.availablePhoneNumbers = phoneNumbers;
      this.assignPhoneNumbers(portNumber);
    },
    (err: Error) => {
      if (this.isPort) {
        this.portingService.removeLocalPortRequestByPortingNumber(portNumber);
        this.portErrorMessage = this.cms.get('numberNotPortable');
        this.isNumberPortable = false;
      } else {
        this.newNumberErrorMessage = err.message;
      }
    });
  }

  assignPhoneNumbers(portNumber?: string) {
    const phoneNumberAssignment = this.prospectCustomerService.assignPhoneNumbers();
    if (phoneNumberAssignment === 'ok') {
      if (this.isPort) {
        this.portingService.assignTemporaryNumber(this.prospectCustomerService.prospectCustomer.phone, portNumber);
        this.isNumberPortable = true;
        this.prospectCustomerService.prospectCustomer.portingPhoneNumber = portNumber;
        this.prospectCustomerService.cacheProspectCustomer();
      }
      this.teamService.team[0].phone = this.prospectCustomerService.availablePhoneNumbers[
        this.prospectCustomerService.availablePhoneNumbers.length - 1
      ];
      this.teamService.cacheTeam();
    } else {
      if (this.isPort) {
        this.portingService.removeLocalPortRequestByPortingNumber(portNumber);
        this.portErrorMessage = this.cms.get('insufficientNumbers', this.prospectCustomer.areaCode);
      } else {
        this.newNumberErrorMessage = this.cms.get('insufficientNumbers', this.prospectCustomer.areaCode);
      }
    }
  }

  // Saves phone number as main account number and goes to next step
  savePhoneNumber(): void {
    this.prospectCustomerService.savePhoneSettings(
      this.enableFax && this.checkFax
    );

    if (!this.isPort) {
      this.portingService.removeLocalPortRequestByTempNumber(this.prospectCustomerService.prospectCustomer.phone);
    }

    // Go to next step
    if (this.portingFlow && this.portingService.portRequests.length > 1) {
      this.router.navigate(['/buyer/porting/team']);
    } else if (this.portingFlow) {
      this.router.navigate(['/buyer/sign-up/summary']);
    } else {
      if (this.router.url.indexOf('/buyer/') !== -1) {
        this.router.navigate([this.suf.getNextStep()]);
      } else {
        this.router.navigate([this.pfs.getNextStep()]);
      }
    }
  }

  suppressNonDigits(e) {
    const key = e.key;
    if (key && key.length === 1 && /\D/.test(key)) {
      e.preventDefault();
    }
  }

  canGenerateNumber(): boolean {
    return this.prospectCustomer.areaCode && this.prospectCustomer.areaCode.length === 3 &&
    (!this.prospectCustomer.nxxCode || this.prospectCustomer.nxxCode.length === 3);
  }

  canGetFaxLine() {
    return (this.prospectCustomer.phone || this.isNumberPortable )
    && !this.portErrorMessage && !this.newNumberErrorMessage && this.enableFax;
  }

  canPort(): boolean {
    if (!this.portingFlow) {
      return this.isPort && this.isNumberPortable && this.portingPhone && !this.portErrorMessage;
    } else {
      let port = this.portingService.portRequests.find(portRequest => {
        return portRequest.isCompany;
      });
      return this.isPort && this.isNumberPortable && this.portingPhone && !this.portErrorMessage && port.complete;
    }
  }

  hasPortError(): boolean {
    return this.portErrorMessage && this.isPort;
  }

  // If numbers are not available in that area code we consider that number ineligible for port.
  port(event) {
    this.portingPhone = event;
    this.prospectCustomer.areaCode = extractAreaCode(this.portingPhone);
    // Happy path: this.searchPhoneNumber() -> this.assignPhoneNumbers() -> this.isNumberPortable = true;
    this.searchPhoneNumber(event);
  }

  previousStep() {
    if (this.router.url.indexOf('/buyer/') !== -1) {
      this.router.navigate([this.suf.getPreviousStep()]);
    } else {
      this.router.navigate([this.pfs.getPreviousStep()]);
    }
  }

}
