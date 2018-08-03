/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { CmsService, UserService, HuntGroupService, HuntGroup } from 'services';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface HiModalInterface {
  admin: boolean;
  adminComplete: boolean;
  userComplete: boolean;
  useModals: boolean;
}

@Component({
  selector: 'app-hi',
  templateUrl: './hi.component.html',
  styleUrls: ['./hi.component.scss']
})
export class HiComponent extends WizardPage implements HiModalInterface, OnInit {
  admin: boolean;
  adminComplete: boolean;
  userComplete: boolean;
  useModals: boolean;
  userComponentsEnabled: boolean;

  constructor(
    public cms: CmsService,
    public userService: UserService,
    public hg: HuntGroupService,
    private titleService: Title
  ) {
    super();
    this.userComponentsEnabled = this.cms.getFromProvider('onboardingUserComponentsEneabled');
    this.setPageTitle();
  }

  ngOnInit() {

  }

  setPageTitle() {
    if (this.admin && !this.adminComplete) {
      this.titleService.setTitle(this.cms.get('welcome-header'));
    } else if (this.admin && this.adminComplete && !this.userComplete) {
      this.titleService.setTitle(this.cms.get('welcome-admin-complete-header'));
    } else if (!this.admin && !this.userComplete) {
      this.titleService.setTitle(this.cms.get('welcome-user-header'));
    } else {
      this.titleService.setTitle(this.cms.get('onboarding-complete'));
    }
  }

}
