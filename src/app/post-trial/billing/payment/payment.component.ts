import { Component, OnInit } from '@angular/core';
import { CmsService, STATES, FormValidationService } from 'services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ControlMessagesComponent } from 'components';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public billingForm: FormGroup;

  public states: string[] = STATES;
  constructor(public cms: CmsService, private fb: FormBuilder, private formValidationService: FormValidationService) {
    this.billingForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, this.formValidationService.nameValidator])),
      'cardNumber': new FormControl('', Validators.compose([Validators.required, this.formValidationService.creditCardValidator])),
      'address1': new FormControl('', Validators.required),
      'address2': new FormControl(''),
      'city': new FormControl('', Validators.compose([Validators.required, this.formValidationService.nameValidator])),
      'state': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.compose([Validators.required, this.formValidationService.zipCodeValidator]))
    });
  }

  ngOnInit() {
  }

}
