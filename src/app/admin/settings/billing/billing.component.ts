import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CmsService, GroupService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  billingInfoSrc: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    public cms: CmsService,
    private groupService: GroupService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('billing'));
  }

  ngOnInit() {
    // this.groupService.getBillingInfo().subscribe(res => {
    //   this.billingInfoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(res['iframeUrl']);
    // });
  }

  seeInvoice() {
    console.log('seeInvoice clicked');
  }

  payInvoice() {
    console.log('payInvoice clicked');
  }
}
