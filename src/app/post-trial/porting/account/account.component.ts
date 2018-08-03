import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { PostTrialService, STATES, CmsService, UserService, AdminService, FormValidationService } from 'services';
import { ControlMessagesComponent } from 'components';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public accountConfirmForm: FormGroup;
  public states: string[] = STATES;

  constructor(
    private fb: FormBuilder,
    private ptueService: PostTrialService,
    public cms: CmsService,
    public adminService: AdminService,
    public userService: UserService,
    private formValidationService: FormValidationService
   // private orderService: OrderService,
  ) {
    this.accountConfirmForm = this.fb.group({
      'billingTelephone': [this.userService.user.billingPhone,
        Validators.compose([
          Validators.required,
          this.formValidationService.phoneValidator.bind(this.formValidationService)
        ])
      ],
      'serviceProvider': [this.userService.user.portingServiceProvider],
      'firstName': [this.userService.user.firstName, Validators.compose([Validators.required, this.formValidationService.nameValidator])],
      'lastName': [this.userService.user.lastName, Validators.compose([Validators.required, this.formValidationService.nameValidator])],
      'billingAddress1': [this.userService.user.billingAddress.address1, Validators.required],
      'billingAddress2': [this.userService.user.billingAddress.address2],
      'billingCity': [this.userService.user.billingAddress.city,
        Validators.compose([Validators.required, this.formValidationService.nameValidator])
      ],
      'billingState': [this.userService.user.billingAddress.state, Validators.required],
      'billingZip': [this.userService.user.billingAddress.postalCode,
        Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])
      ],
    });

  }


  ngOnInit() {

  }

  // Save data from form to user data.
  saveAccountInfo() {
    let user = this.userService.user;
    user.billingAddress.address1 = this.accountConfirmForm.controls.billingAddress1.value;
    user.billingAddress.address2 = this.accountConfirmForm.controls.billingAddress2.value;
    user.billingAddress.firstName = this.accountConfirmForm.controls.firstName.value;
    user.billingAddress.lastName = this.accountConfirmForm.controls.lastName.value;
    user.billingAddress.city = this.accountConfirmForm.controls.billingCity.value;
    user.billingAddress.state = this.accountConfirmForm.controls.billingState.value;
    user.billingAddress.postalCode = this.accountConfirmForm.controls.billingZip.value;
    user.billingAddress.country = this.cms.getFromProvider('defaultCountry');
    user.billingPhone = this.accountConfirmForm.controls.billingTelephone.value;


    // @todo: Get api to save billing data.

  }

}
