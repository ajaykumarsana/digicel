import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService } from '../cms';
import { Page } from './page';

@Injectable()
export class SignUpFlowService {
  public devicesEnabled: boolean;
  public buyerSignUpBase = '/buyer/sign-up/';
  public flow: Page[];

  constructor(private router: Router, private cms: CmsService) {
    this.devicesEnabled = Boolean(this.cms.getFromProvider('devicesEnabled')) || false; // disabled by default if not set
    this.flow = this.getFlowData();
  }

  getCurrentPageUrl() {
    return this.router.url.split('?')[0];
  }

  getCurrentPage(): Page {
    return this.flow.find(f => f.url === this.getCurrentPageUrl());
  }

  getCurrentPageIndex(): number {
    return this.flow.findIndex(f => f.url === this.getCurrentPageUrl());
  }

  getCurrentPageName(): string {
    const currentPage = this.getCurrentPage();
    return currentPage ? currentPage.name : '';
  }

  getNextStep(): string {
    const nextPageIndex = this.getCurrentPageIndex() + 1;
    if (nextPageIndex < this.flow.length) {
      return this.flow[nextPageIndex].url;
    } else {
      return this.buyerSignUpBase + 'post-checkout';
    }
  }

  getPreviousStep(): string {
    let prevStepIndex = this.getCurrentPageIndex() - 1;
    if (prevStepIndex < 0) {
      prevStepIndex = 0;
    }
    return this.flow[prevStepIndex].url;
  }

  isCurrentPagePostCheckout(): boolean {
    return this.getCurrentPageUrl() === this.buyerSignUpBase + 'post-checkout';
  }

  private getFlowData(): Page[] {
    let flow = [];
    flow.push({
      name: 'Account',
      key: 'account',
      url: this.buyerSignUpBase + 'account'
    });

    flow.push({
      name: 'Company Phone',
      key: 'companyNumber',
      url: this.buyerSignUpBase + 'phone-number'
    });

    flow.push({
      name: 'Team',
      key: 'team',
      url: this.buyerSignUpBase + 'team'
    });

    flow.push({
      name: 'Summary',
      key: 'summary',
      url: this.buyerSignUpBase + 'summary'
    });

    flow.push({
      name: 'Checkout',
      key: 'checkout',
      url: this.buyerSignUpBase + 'checkout'
    });

    return flow;
  }

}
