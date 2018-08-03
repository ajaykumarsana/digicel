import { Component, OnInit } from '@angular/core';
import { STATES, CmsService, UserService, User, FormValidationService } from 'services';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ControlMessagesComponent } from 'components';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  public addressForm: FormGroup;
  public states: string[] = STATES;
  public shippingForm: FormGroup;
  public user: User;

  constructor(
    public cms: CmsService,
    public userService: UserService,
    public fb: FormBuilder,
    private formValidationService: FormValidationService) {
    this.user = this.userService.user;
    this.shippingForm = this.fb.group({
      'shippingAddress1': [this.user.billingAddress.address1, Validators.required],
      'shippingAddress2': [this.user.billingAddress.address2],
      'shippingCity': [this.user.billingAddress.city,
        Validators.compose([Validators.required, this.formValidationService.nameValidator])
        // Validators.required
      ],
      'shippingState': [this.user.billingAddress.state || '', Validators.required],
      'shippingZip': [
        this.user.billingAddress.postalCode,
        Validators.compose([Validators.required, this.formValidationService.zipCodeValidator])
      ]
    });
  }

  ngOnInit() {

  }

  updateShippingData() {
    let user = this.userService.user;
    // if(this.checkbox shipping same, then set shipping iwth billing. and return

    // Set with form data
    user.shippingAddress.address1 = this.addressForm.controls.shippingAddress1.value;
    user.shippingAddress.address2 = this.addressForm.controls.shippingAddress2.value;
    user.shippingAddress.city = this.addressForm.controls.shippingCity.value;
    user.shippingAddress.postalCode = this.addressForm.controls.shippingZip.value;
    user.shippingAddress.state = this.addressForm.controls.shippingState.value;

    // Not set with form
    user.shippingAddress.country = this.cms.getFromProvider('defaultCountry');
    user.shippingAddress.firstName = user.firstName;
    user.shippingAddress.lastName = user.lastName;

  }

  toggleBillingAddress(event) {
    if (event.target.checked) {
      this.addressForm.controls['shippingAddress1'].setValue(this.user.billingAddress.address1);
      this.addressForm.controls['shippingAddress2'].setValue(this.user.billingAddress.address2);
      this.addressForm.controls['shippingCity'].setValue(this.user.billingAddress.city);
      this.addressForm.controls['shippingState'].setValue(this.user.billingAddress.state);
      this.addressForm.controls['shippingZip'].setValue(this.user.billingAddress.postalCode);
    } else {
      this.addressForm.reset();
    }
  }

}
