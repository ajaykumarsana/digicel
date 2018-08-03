import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-glue-billing-summary',
  templateUrl: './glue-billing-summary.component.html',
  styleUrls: ['./glue-billing-summary.component.scss']
})
export class GlueBillingSummaryComponent implements OnInit {
  @Input() glueBillingSummary: any;
  @Output() glueBillingSummaryClose = new EventEmitter<any>();
  public userViewingSummary: boolean;

  constructor(public cms: CmsService) {}

  ngOnInit() {
  }

  showBillingSummaryPopup() {
    this.userViewingSummary = true;
  }

  closeBillingSummaryPopup() {
    this.glueBillingSummaryClose.emit();
  }

}
