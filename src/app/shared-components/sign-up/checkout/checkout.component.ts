import { Component, OnInit } from '@angular/core';
import { CmsService, FormValidationService, OrderService,
         SignUpFlowService, ProvisioningFlowService, EXPMONTHS, EXPYEARS, ProspectCustomerService, GroupService, STATES  } from 'services';
import { FormBuilder, FormsModule, Validators, FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from 'components';
import { IAddress } from '../../../interfaces';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public pageTitle: string;
  public pageDescription: string;
  public pageClass: string;

  public errorMessage: string;
  public paymentCaptureForm: FormGroup;
  public billingAddressForm: FormGroup;
  public shippingAddressForm: FormGroup;
  public expmonths: string[] = EXPMONTHS;
  public expyears: string[] = EXPYEARS;
  public states: string[] = STATES;
  public showBillingAddress = false;
  public showShippingAddress = false;
  public isPlacingOrder = false;
  private companyName: string;
  private address: IAddress;

  constructor(
    private router: Router,
    public cms: CmsService,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    public orderService: OrderService,
    public suf: SignUpFlowService,
    public pfs: ProvisioningFlowService,
    private prospectCustomerService: ProspectCustomerService,
    private groupService: GroupService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('checkoutSetupTitle'));
    this.paymentCaptureForm = this.fb.group({
      'cardHolderName': ['', Validators.required],
      'cardNumber': ['', Validators.compose([Validators.required, this.formValidationService.creditCardValidator])],
      'expMonth': ['', Validators.required],
      'expYear': ['', Validators.required],
      'cardCCV': ['', Validators.required],
      'billingZip': ['', Validators.required]
    });

    this.billingAddressForm = this.fb.group({
      'company': ['', Validators.required],
      'address1': ['', Validators.required],
      'address2': [''],
      'city': ['', Validators.required],
      'state': ['' || '', Validators.required],
      'postalCode': ['', Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])]
    });

    this.shippingAddressForm = this.fb.group({
      'company': ['', Validators.required],
      'address1': ['', Validators.required],
      'address2': [''],
      'city': ['', Validators.required],
      'state': ['' || '', Validators.required],
      'postalCode': ['', Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])]
    });

   }

  ngOnInit() {
    this.errorMessage = null;
    let address = this.prospectCustomerService.prospectCustomer.companyAddress;

    // Child Component Data - Sign up header
    this.pageTitle = this.cms.get('checkoutSetupTitle');
    this.pageDescription = this.cms.get('checkoutSetupDescription');
    this.pageClass = 'checkout';
  }

  savePaymentInfo() {
    console.log('in the savePaymentInfo');
  }

  getTermsAndConditionsLink() {
    let linkObj = this.cms.getFromProvider('buyerTermsAndConditionsLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

  // Processes payment and moves to summary screen
  checkout(): void {
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


  toggleBillingAddress(event) {
    if (event.target.checked) {
      this.showBillingAddress = false;
      let billingAddress, billingCompanyName;
      billingAddress = this.prospectCustomerService.prospectCustomer.companyAddress;
      billingCompanyName = this.prospectCustomerService.prospectCustomer.company;
      if (this.billingAddressForm.controls['company'] !== undefined) {
        this.billingAddressForm.controls['company'].setValue(billingCompanyName);
      }
      this.billingAddressForm.controls['address1'].setValue(billingAddress.address1);
      this.billingAddressForm.controls['address2'].setValue(billingAddress.address2);
      this.billingAddressForm.controls['city'].setValue(billingAddress.city);
      this.billingAddressForm.controls['state'].setValue(billingAddress.state);
      this.billingAddressForm.controls['postalCode'].setValue(billingAddress.postalCode);
    } else {
      this.showBillingAddress = true;
      this.billingAddressForm.reset();
    }
  }

  toggleShippingAddress(event) {
    if (event.target.checked) {
      this.showShippingAddress = false;
      let shippingAddress, shippingCompanyName;
      shippingAddress = this.prospectCustomerService.prospectCustomer.companyAddress;
      shippingCompanyName = this.prospectCustomerService.prospectCustomer.company;
      if (this.shippingAddressForm.controls['company'] !== undefined) {
        this.shippingAddressForm.controls['company'].setValue(shippingCompanyName);
      }
      this.shippingAddressForm.controls['address1'].setValue(shippingAddress.address1);
      this.shippingAddressForm.controls['address2'].setValue(shippingAddress.address2);
      this.shippingAddressForm.controls['city'].setValue(shippingAddress.city);
      this.shippingAddressForm.controls['state'].setValue(shippingAddress.state);
      this.shippingAddressForm.controls['postalCode'].setValue(shippingAddress.postalCode);
    } else {
      this.showShippingAddress = true;
      this.shippingAddressForm.reset();
    }
  }

  previousStep() {
    if (this.router.url.indexOf('/buyer/') !== -1) {
      this.router.navigate([this.suf.getPreviousStep()]);
    } else {
      this.router.navigate([this.pfs.getPreviousStep()]);
    }
  }

}
