import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PTUEStepInterface } from './ptue-step.interface';
import { CmsService } from '../cms';
import { AdminService } from '../admin';
import { UserService } from '../user';
import { GroupService } from '../group';
import { PostTrialData } from './post-trial-data';
import { ToastService } from '../toast';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostTrialService {

  public user: UserService;
  public devicesEnabled: boolean;
  public ptueBase = '/post-trial/';
  public ptuePorting = 'buyer-porting/';
  public ptueShipping = 'shipping/';
  public ptueBilling = 'billing/';
  public ptueSteps: PTUEStepInterface[];
  public ptueSections: Array<any>;
  public numbers: Array<any>;
  public billingSectionTitle: string;
  public shippingSectionTitle: string;
  public portingSectionTitle: string;
  public portingHeaderLabel: string;
  public accountInformationLabel: string;
  public numberConfirmationLabel: string;
  public transferAuthorizationLabel: string;
  public selectDevicesLabel: string;
  public shippingFormLabel: string;
  public billingPreviewLabel: string;
  public termsAndConditionsLabel: string;
  public paymentLabel: string;
  public thankYouLabel: string;



  constructor(
    private router: Router,
    private cms: CmsService,
    private adminService: AdminService,
    private userService: UserService,
    private groupService: GroupService,
    private toastService: ToastService
  ) {
    this.billingSectionTitle = this.cms.get('billingSectionTitle');
    this.shippingSectionTitle = this.cms.get('shippingSectionTitle');
    this.portingSectionTitle = this.cms.get('portingSectionTitle');
    this.portingHeaderLabel = this.cms.get('portingHeaderLabel');
    this.accountInformationLabel = this.cms.get('accountInformationLabel');
    this.numberConfirmationLabel = this.cms.get('numberConfirmationLabel');
    this.transferAuthorizationLabel = this.cms.get('transferAuthorizationLabel');
    this.selectDevicesLabel = this.cms.get('selectDevicesLabel');
    this.shippingFormLabel = this.cms.get('shippingFormLabel');
    this.billingPreviewLabel = this.cms.get('billingPreviewLabel');
    this.termsAndConditionsLabel = this.cms.get('termsAndConditionsLabel');
    this.paymentLabel = this.cms.get('paymentLabel');
    this.thankYouLabel = this.cms.get('thankYouLabel');
    this.ptueSteps = this.setUpPTUESteps();
    this.ptueSections = [
      { name: this.portingSectionTitle, sectionPassed: false},
      { name: this.shippingSectionTitle, sectionPassed: false},
      { name: this.billingSectionTitle, sectionPassed: false }
    ];

  }

  // Enforces user to be logged in
  authGuard(): boolean {
    // this.adminService.resolve().subscribe(response => {
      // console.log(response);
      return true;
    // });
  }

  // Enforces which page of flow user is on (so they cannot skip ahead)
  flowGuard() {

  }

  setNumbers(numbers: Array<any>) {
    this.numbers = numbers;

    // temp until we store backend
    sessionStorage.setItem('numbers', JSON.stringify(numbers));
  }

  getNumbers() {
    if (!this.numbers) {
      this.numbers = JSON.parse(sessionStorage.getItem('numbers'));
    }

    return this.numbers;
  }

  // Returns Url of the Current Page
  getCurrentPageUrl() {
    return this.router.url.split('?')[0];
  }

  // Returns Current Page Details Object
  getCurrentPage(): PTUEStepInterface {
    return this.ptueSteps[this.getCurrentPageIndex()];
  }

  // Returns index of current page in steps array
  getCurrentPageIndex(): number {
    console.log(this.getCurrentPageUrl());
    return this.ptueSteps.findIndex(f => f.url === this.getCurrentPageUrl());
  }

  getCurrentSectionIndex(): number {
    return this.getCurrentPage().sectionIndex;
  }

  // Returns url for the next page in the flow
  getNextStepUrl(): string {
    const nextPageIndex = this.getCurrentPageIndex() + 1;
    if (nextPageIndex < this.ptueSteps.length) {
      return this.ptueSteps[nextPageIndex].url;
    } else {
      return this.ptueBase + 'finish';
    }
  }

  // Returns url of previous page in flow
  getPreviousStepUrl(): string {
    let prevStepIndex = this.getCurrentPageIndex() - 1;
    if (prevStepIndex < 0) {
      prevStepIndex = 0;
    }
    return this.ptueSteps[prevStepIndex].url;
  }

  // returns url of first page in the flow
  getFirstStepUrl() {
    return this.ptueSteps[0].url;
  }

  // Sets up the steps in the post trial flow
  setUpPTUESteps(): PTUEStepInterface[] {
    let steps = [];

    steps.push({
      sectionIndex: -1,
      section: null,
      key: 'getStarted',
      name: this.portingHeaderLabel,
      url: this.ptueBase + 'get-started',
      headerStyle: 'image',
      iconClass: null
    });

    steps.push({
      sectionIndex: 0,
      section: this.portingSectionTitle,
      key: 'account',
      name: this.accountInformationLabel,
      url: this.ptueBase + this.ptuePorting + 'account',
      headerStyle: 'standard',
      iconClass: 'icon-transfer'
    });

    steps.push({
      sectionIndex: 0,
      section: this.portingSectionTitle,
      key: 'numbers',
      name: this.numberConfirmationLabel,
      url: this.ptueBase + this.ptuePorting + 'confirm-numbers',
      headerStyle: 'standard',
      iconClass: 'icon-transfer'
    });

    steps.push({
      sectionIndex: 0,
      section: this.portingSectionTitle,
      key: 'transferAuth',
      name: this.transferAuthorizationLabel,
      url: this.ptueBase + this.ptuePorting + 'authorize-transfer',
      headerStyle: 'standard',
      iconClass: 'icon-transfer'

    });

    steps.push({
      sectionIndex: 1,
      section: this.shippingSectionTitle,
      key: 'chooseDevices',
      name: this.selectDevicesLabel,
      url: this.ptueBase + this.ptueShipping + 'choose-devices',
      headerStyle: 'standard',
      iconClass: 'icon-shipping'
    });

    steps.push({
      sectionIndex: 1,
      section: this.shippingSectionTitle,
      key: 'shippingForm',
      name: this.shippingFormLabel,
      url: this.ptueBase + this.ptueShipping + 'shipping-form',
      headerStyle: 'standard',
      iconClass: 'icon-shipping'
    });

    steps.push({
      sectionIndex: 2,
      section: this.billingSectionTitle,
      key: 'preview',
      name: this.billingPreviewLabel,
      url: this.ptueBase + this.ptueBilling + 'preview',
      headerStyle: 'standard',
      iconClass: 'icon-cart'

    });

    steps.push({
      sectionIndex: 2,
      section: this.billingSectionTitle,
      key: 'terms-and-conditions',
      name: this.termsAndConditionsLabel,
      url: this.ptueBase + this.ptueBilling + 'terms-and-conditions',
      headerStyle: 'standard',
      iconClass: 'icon-terms'
    });

    steps.push({
      sectionIndex: 2,
      section: this.billingSectionTitle,
      key: 'payment',
      name: this.paymentLabel,
      url: this.ptueBase + this.ptueBilling + 'payment',
      headerStyle: 'standard',
      iconClass: 'icon-cart'

    });

    steps.push({
      sectionIndex: 3,
      section: null,
      key: 'finish',
      name: this.thankYouLabel,
      url: this.ptueBase + 'finish',
      headerStyle: 'image',
      iconClass: null
    });

    return steps;
  }


  resolve(): Observable<PostTrialData> {
    return this.userService.getUserOrLogin()
    // If user is not authenticated, redirect to login page
    .catch(err => {
      this.router.navigate(['/login']);
      return Observable.of(null);
    })
    // Initialize services that require user info
    .map(user => {
      if (user) {
        this.user = user;
      }
    // Make a bunch of API calls that require user info
    }).flatMap(() => {
      // If no user (not authenticated), exit this method by returning observable of null
      if (!this.user) {
        return Observable.of(null);
      }
      // The API calls that all users need to determine FTUE status and bootstrap the admin portal
      let initializationCalls: Observable<any>[] = [
        // Allow this call to fail and continue loading admin
        this.userService.getDevices().catch(e => this.catchApiError(e, this.cms.get('devices'))),
        this.groupService.getTeamMembers().catch(e => this.catchApiError(e, this.cms.get('team'))),
        this.groupService.getGroup().catch(e => this.catchApiError(e, this.cms.get('team')))
      ];
      // Make all the API calls in parallel
      return Observable.forkJoin(...initializationCalls);
    });
  }


  private catchApiError(err: Error, thingThatDidntLoad: string): Observable<any> {
    this.toastService.toast(this.cms.get('failedToLoad', thingThatDidntLoad), 'warning', 15000, true);
    return Observable.of({});
  }
}
