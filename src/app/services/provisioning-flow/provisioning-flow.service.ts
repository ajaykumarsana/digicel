import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService } from '../cms';
import { Page } from './page';

@Injectable()
export class ProvisioningFlowService {
  public devicesEnabled: boolean;
  public provisioningSignUpBase = '/provisioning/sign-up/';
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
      return this.provisioningSignUpBase + 'post-checkout';
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
    return this.getCurrentPageUrl() === this.provisioningSignUpBase + 'post-checkout';
  }

  private getFlowData(): Page[] {
    let flow = [];
    flow.push({
      name: 'Account',
      key: 'account',
      url: this.provisioningSignUpBase + 'account'
    });

    flow.push({
      name: 'Company Phone',
      key: 'companyNumber',
      url: this.provisioningSignUpBase + 'phone-number'
    });

    flow.push({
      name: 'Team',
      key: 'team',
      url: this.provisioningSignUpBase + 'team'
    });

    flow.push({
      name: 'Summary',
      key: 'summary',
      url: this.provisioningSignUpBase + 'summary'
    });

    flow.push({
      name: 'Success',
      key: 'success',
      url: this.provisioningSignUpBase + 'post-checkout'
    });

    return flow;
  }

}
