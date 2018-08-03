/* tslint:disable:no-access-missing-member */
import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService, FormValidationService, UserService, Device } from 'services';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface SimRingInterface {
  useModals: boolean;
}

@Component({
  selector: 'app-sim-ring',
  templateUrl: './sim-ring.component.html',
  styleUrls: ['./sim-ring.component.scss']
})
export class SimRingComponent extends WizardPage implements SimRingInterface {
  public setup: FormGroup;
  public phone: string;
  newDevice: Device;
  showError = false;
  errorMsg: string;
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public userService: UserService,
    private formValidationService: FormValidationService,
    private titleService: Title
  ) {
    super();
    this.titleService.setTitle(this.cms.get('sim-ring-header'));
    this.setup = fb.group({
      phone: ['', Validators.compose([
          Validators.required,
          this.formValidationService.phoneValidator.bind(this.formValidationService)
      ])]
    });
  }

  phoneChange(event) {
    this.phone = event;
    this.cdr.detectChanges();
  }

  setAndShowErrorMsg(errorMsg) {
    this.errorMsg = errorMsg;
    this.showError = true;
    setTimeout(() => this.showError = false, 5000);
  }

  skipSimRing() {
    super.finish();
  }

  finish() {
    this.userService.addDevice(this.phone)
      .subscribe(
        devices => {
          super.finish();
        },
        error => {
          this.setAndShowErrorMsg(error);
        }
      );
  }

}
