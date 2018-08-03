/* tslint:disable:no-access-missing-member */
import { Component } from '@angular/core';
import { CmsService } from 'services';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface PhoneMenuInterface {
  useModals: boolean;
}

@Component({
  selector: 'app-phone-menu-modal',
  templateUrl: './phone-menu-modal.component.html',
  styleUrls: ['./phone-menu-modal.component.scss']
})
export class PhoneMenuModalComponent extends WizardPage implements PhoneMenuInterface {
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private titleService: Title
  ) {
    super();
    this.titleService.setTitle(this.cms.get('phone-menu-header'));
   }

  // Todo Fix to validate aaginst form
  formValid() {
    return true;
  }

}
