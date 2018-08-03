/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidationService, CmsService, UserService, ToastService } from 'services';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface PasswordInterface {
  isFTUE: boolean;
  isOnboarding: boolean;
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends WizardPage implements OnInit {
  // Do not show old password field if password has never been set by user
  isFTUE: boolean;
  passwordChangeForm: FormGroup;
  isOnboarding: boolean;

  constructor(
    private fb: FormBuilder,
    public cms: CmsService,
    private userService: UserService,
    public toastService: ToastService,
    private formValidationService: FormValidationService,
    private titleService: Title
  ) {
    super();
    this.titleService.setTitle(this.cms.get('changePassword'));
  }

  ngOnInit() {
    const passwordGroup = {
      'matchingPasswords': this.fb.group({
        'newPassword1': [null, Validators.compose([Validators.required, this.formValidationService.passwordValidator])],
        'newPassword2': [null, Validators.compose([Validators.required, this.formValidationService.passwordValidator])]
      }, { validator: this.formValidationService.passwordsMatchValidator })};
    if (!this.isFTUE && !this.isOnboarding) {
      passwordGroup['oldPassword'] = [null, Validators.compose([Validators.required])];
    }
    this.passwordChangeForm = this.fb.group(passwordGroup);
  }

  clearForm() {
    this.passwordChangeForm.reset();
  }

  save() {
    let isFTUEOROnBoarding = this.isFTUE || this.isOnboarding;
    const oldPassword = isFTUEOROnBoarding ? null : this.passwordChangeForm.controls.oldPassword.value;
    const newPassword = this.passwordChangeForm.controls.matchingPasswords['controls']['newPassword1']['value'];
    this.userService.changePassword(newPassword, oldPassword).subscribe(
      () => this.toastService.toast(this.cms.get('passwordChangeSuccess'), 'success', 5000, true),
      (err) => this.toastService.toast(err, 'danger', 8000, true)
    );
    this.clearForm();

    if (this.isFTUE || this.isOnboarding) {
      super.finish();
    }
  }

}
