import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

}
