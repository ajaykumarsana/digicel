import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PhoneNumbersService, CmsService, PortingService,
         Port, FormValidationService, ProspectTeamMember,
         ProspectCustomerService, GroupService, STATES } from 'services';
import { PhonePipe } from 'pipes';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-porting-form',
  templateUrl: './porting-form.component.html',
  styleUrls: ['./porting-form.component.scss']
})
export class PortingFormComponent implements OnInit {

  @Output() onPort: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangePortNumber: EventEmitter<any> = new EventEmitter<any>();
  @Input() member: ProspectTeamMember;
  @Input() isCompany = false;
  @Input() portingPhone: string;
  public portForm: FormGroup;
  public portDetailsForm: FormGroup;
  public addressForm: FormGroup;
  public portErrorMessage: string;
  public isPortable: boolean; // used to check if an entered number is portable
  public portEligible: boolean; // used to check if this customer can port at all
  public showBillingAddress = false;
  public displayMessage: string;
  public phone: PhonePipe;
  public carrier = '';
  public portLoading = false;
  public portDetails = false;
  public states: string[] = STATES;
  private GLUE: boolean;
  private noPort: boolean;

  constructor(
    public fb: FormBuilder,
    public phoneService: PhoneNumbersService,
    public cms: CmsService,
    private formValidationService: FormValidationService,
    private prospectCustomerService: ProspectCustomerService,
    private groupService: GroupService,
    private aRoute: ActivatedRoute,
    public portingService: PortingService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('portingTitle'));
    this.GLUE = aRoute.snapshot.data.GLUE;
    this.noPort = aRoute.snapshot.data.noPort;
    this.portEligible = true;
    this.phone = new PhonePipe(cms);
  }

  ngOnInit() {
    this.portForm = this.fb.group({
      'txtNumber': [this.portingPhone || '',
        Validators.compose([
          Validators.required,
          this.formValidationService.phoneValidator.bind(this.formValidationService)
        ])]
    });
    let portInProgress = this.portingService.portRequests.find(port => {
      return port.temporaryPhoneNumber === this.member.phone;
    });
    if (portInProgress && (this.noPort || portInProgress.complete)) {
      const portingNumber = this.portingService.getPortRequestNumberByTempNumber(this.member.phone);
      this.portEligible = false;
      this.displayMessage = this.cms.get('portInProgress', this.phone.transform(portingNumber));
    }
    this.portDetailsForm = this.fb.group({
      'billingPhone': ['',
        Validators.compose([
          Validators.required,
          this.formValidationService.phoneValidator.bind(this.formValidationService)
        ])],
      'accountName': [this.member.fullName,
        Validators.compose([
          Validators.required,
          this.formValidationService.nameValidator
        ])],
      'accountNumber': ['',
        Validators.required
      ],
      'PIN': ['',
        Validators.required
      ]
    });
    let address, companyName;
    if (this.GLUE) {
      address = this.groupService.group.customer.billingAddress;
      companyName = this.groupService.group.groupName;
    } else {
      address = this.prospectCustomerService.prospectCustomer.companyAddress;
      companyName = this.prospectCustomerService.prospectCustomer.company;
    }
    this.addressForm = this.fb.group({
      'company': [companyName, Validators.required],
      'address1': [address.address1, Validators.required],
      'address2': [address.address2],
      'city': [address.city, Validators.required],
      'state': [address.state || '', Validators.required],
      'postalCode': [address.postalCode, Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])]
    });

    if (this.portingPhone && !this.displayMessage) {
      this.portNumber();
    }
  }

  changePortNumber() {
    this.portErrorMessage = '';
    this.onChangePortNumber.emit();
  }

  // Ports a phone Number (right now only checks eligibility)
  portNumber() {
    this.portLoading = true;
    this.portForm.controls['txtNumber'].disable();
    this.phoneService.checkPortingEligibility(this.portForm.controls.txtNumber.value).subscribe(portabilityCheck => {
      this.isPortable = portabilityCheck.isPortable;
      if (!this.isPortable) {
        this.portErrorMessage = this.cms.get('numberNotPortable');
        this.portLoading = false;
        this.portForm.controls['txtNumber'].enable();
      } else if (this.noPort) {
        this.portLoading = false;
        this.portDetailsForm.controls['billingPhone'].setValue(this.portForm.controls.txtNumber.value);
        this.submitDetails(false);
      } else {
        this.carrier =  portabilityCheck.portability.carrierName;
        this.portDetailsForm.controls['billingPhone'].setValue(this.portForm.controls.txtNumber.value);
        this.portDetails = true;
        this.portLoading = false;

        if (!portabilityCheck.portability.loaRequiredFields['accountNumber']) {
          this.portDetailsForm.removeControl('accountNumber');
        }
        if (!portabilityCheck.portability.loaRequiredFields['accountPIN']) {
          this.portDetailsForm.removeControl('PIN');
        }
        if (!portabilityCheck.portability.loaRequiredFields['businessName']) {
          this.addressForm.removeControl('company');
        }
      }
    });
  }

  submitDetails(complete: boolean) {
    let portObj = new Port({
      'temporaryPhoneNumber': this.member.phone,
      'portingPhoneNumber': this.portForm.controls.txtNumber.value,
      'billingTelephoneNumber': this.portDetailsForm.controls['billingPhone'].value,
      'businessName': this.addressForm.controls['company'] ? this.addressForm.controls['company'].value : null,
      'accountAddress': {
        'address1': this.addressForm.controls['address1'].value,
        'address2': this.addressForm.controls['address2'].value,
        'city': this.addressForm.controls['city'].value,
        'state': this.addressForm.controls['state'].value,
        'postalCode': this.addressForm.controls['postalCode'].value
      },
      'authorizingName': this.portDetailsForm.controls['accountName'].value || null,
      'accountNumber': this.portDetailsForm.controls['accountNumber'] ? this.portDetailsForm.controls['accountNumber'].value : null,
      'accountPIN': this.portDetailsForm.controls['PIN'] ? this.portDetailsForm.controls['PIN'].value : null,
      'status': 'new',
      'complete': complete,
      'isCompany': this.isCompany
    });
    let portAddedToList = this.portingService.addLocalPortRequests(portObj);
    if (portAddedToList === false) {
      this.portErrorMessage = 'Unable to port this number because a port already exists.';

      this.displayMessage = '';
    } else {
      this.onPort.emit(this.portForm.controls.txtNumber.value);
      this.resetForm();
    }
  }

  toggleBillingAddress(event) {
    if (event.target.checked) {
      this.showBillingAddress = false;
      let address, companyName;
      if (this.GLUE) {
        address = this.groupService.group.customer.billingAddress;
        companyName = this.groupService.group.groupName;
      } else {
        address = this.prospectCustomerService.prospectCustomer.companyAddress;
        companyName = this.prospectCustomerService.prospectCustomer.company;
      }
      if (this.addressForm.controls['company'] !== undefined) {
        this.addressForm.controls['company'].setValue(companyName);
      }
      this.addressForm.controls['address1'].setValue(address.address1);
      this.addressForm.controls['address2'].setValue(address.address2);
      this.addressForm.controls['city'].setValue(address.city);
      this.addressForm.controls['state'].setValue(address.state);
      this.addressForm.controls['postalCode'].setValue(address.postalCode);
    } else {
      this.showBillingAddress = true;
      this.addressForm.reset();
    }
  }

  resetForm() {
    this.portForm.controls['txtNumber'].enable();
    this.portDetailsForm.reset();
    this.toggleBillingAddress({target: {checked: true}});
    this.carrier = '';
    this.portDetails = false;
    this.portLoading = false;
  }

  clearPort() {
    this.resetForm();
    this.portForm.reset();
    this.onCancel.emit();
  }

}
