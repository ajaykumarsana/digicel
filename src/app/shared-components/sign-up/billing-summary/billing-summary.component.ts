import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-billing-summary',
  templateUrl: './billing-summary.component.html',
  styleUrls: ['./billing-summary.component.scss']
})
export class BillingSummaryComponent implements OnInit {
  @Input() billingSummary: any;
  @Output() billingSummaryClose = new EventEmitter<any>();
  public userViewingSummary: boolean;

  constructor(public cms: CmsService) {}

  ngOnInit() {
  }

  showBillingSummaryPopup() {
    this.userViewingSummary = true;
  }

  closeBillingSummaryPopup() {
    this.billingSummaryClose.emit();
  }

}
