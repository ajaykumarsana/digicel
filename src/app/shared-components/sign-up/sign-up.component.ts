import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router-transition';
import { CmsService, SignUpFlowService } from 'services';

@Component({
  selector: 'app-sign-up',
  animations: [ routerTransition ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpBannerText: string;

  constructor(public cms: CmsService, private suf: SignUpFlowService) { }

  ngOnInit() {
    this.signUpBannerText = this.cms.getLocalizedFromProvider('signUpBanner');
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  pageNameToKebabCase(): string {
    return this.suf.getCurrentPageName().toLowerCase().replace(' ', '-');
  }

  isPostCheckoutPage(): boolean {
    return this.suf.isCurrentPagePostCheckout();
  }

}
