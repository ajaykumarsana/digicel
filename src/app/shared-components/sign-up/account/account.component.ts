import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService, SignUpFlowService, ProvisioningFlowService, ProspectCustomerService, FormValidationService, STATES } from 'services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public pageTitle: string;
  public pageDescription: string;
  public errorMessage: string;
  public accountSetupForm: FormGroup;
  public userSetupForm: FormGroup;
  public states: string[] = STATES;
  public showCompanyInfo = false;

  constructor(
    private router: Router,
    private prospectCustomerService: ProspectCustomerService,
    public cms: CmsService,
    private fb: FormBuilder,
    private suf: SignUpFlowService,
    private pfs: ProvisioningFlowService,
    private formValidationService: FormValidationService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('accountSetupTitle'));
    const prospectCustomer = this.prospectCustomerService.prospectCustomer;
    const companyAddress = prospectCustomer.companyAddress;
    this.userSetupForm = this.fb.group({
      'firstName': [prospectCustomer.firstName, Validators.required],
      'lastName': [prospectCustomer.lastName, Validators.required],
      'email': [prospectCustomer.email, Validators.compose([Validators.required, this.formValidationService.emailValidator])]
    });

    this.accountSetupForm = this.fb.group({
      'company': [prospectCustomer.company, Validators.required],
      'address1': [companyAddress.address1, Validators.required],
      'address2': [companyAddress.address2],
      'city': [companyAddress.city, Validators.required],
      'state': [companyAddress.state || '', Validators.required],
      'postalCode': [companyAddress.postalCode, Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])]
    });
  }

  ngOnInit() {
    this.pageTitle = this.cms.get('accountSetupTitle');
    this.pageDescription = this.cms.get('accountSetupDescription');
  }

  revealCompanyInfo() {
    this.showCompanyInfo = true;
  }

  // Saves Prospect User Data from form and goes to next step (Phone Number)
  saveCustomer() {
    let pc = this.prospectCustomerService.prospectCustomer;
    pc.firstName = this.userSetupForm.controls.firstName.value;
    pc.lastName = this.userSetupForm.controls.lastName.value;
    pc.email = this.userSetupForm.controls.email.value;
    pc.company = this.accountSetupForm.controls.company.value;
    pc.companyAddress = {
      address1: this.accountSetupForm.controls.address1.value,
      address2: this.accountSetupForm.controls.address2.value,
      city: this.accountSetupForm.controls.city.value,
      state: this.accountSetupForm.controls.state.value,
      postalCode: this.accountSetupForm.controls.postalCode.value,
      country: this.cms.getFromProvider('defaultCountry')
    };

    this.prospectCustomerService.validateCustomer().subscribe(
      () => {
        this.prospectCustomerService.cacheProspectCustomer();
        if (this.router.url.indexOf('/buyer/') !== -1) {
          this.router.navigate([this.suf.getNextStep()]);
        } else {
          this.router.navigate([this.pfs.getNextStep()]);
        }
      },
      (err: Error) => this.errorMessage = err.message
    );
  }
}
