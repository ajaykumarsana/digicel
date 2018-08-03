import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CmsService, SignUpFlowService, ProvisioningFlowService } from 'services';

@Component({
  selector: 'app-sign-up-nav',
  templateUrl: './sign-up-nav.component.html',
  styleUrls: ['./sign-up-nav.component.scss']
})
export class SignUpNavComponent implements OnInit {

  public flow: Array<any>;
  public currentPageUrl: string;
  public currentPageIndex: number;

  constructor(
    public cms: CmsService,
    private suf: SignUpFlowService,
    private pfs: ProvisioningFlowService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updatePageData();
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.updatePageData();
      });
  }

  updatePageData() {
    if (this.router.url.indexOf('/buyer/') !== -1) {
      this.flow = this.suf.flow;
      this.currentPageUrl = this.suf.getCurrentPageUrl();
      this.currentPageIndex = this.suf.getCurrentPageIndex();
      // this.router.navigate([this.suf.getPreviousStep()]);
    } else {
      this.flow = this.pfs.flow;
      this.currentPageUrl = this.pfs.getCurrentPageUrl();
      this.currentPageIndex = this.pfs.getCurrentPageIndex();
      // this.router.navigate([this.pfs.getPreviousStep()]);
    }

    this.flow.forEach((page, i) => {
      page.pagePassed = i <= this.currentPageIndex;
    });
  }

}


