import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, every } from 'lodash';
import { IsValidNumberPipe } from 'pipes';
import { CmsService } from '../cms';

@Injectable()
export class FormValidationService {
    constructor(private cms: CmsService) { }

    getValidatorErrorMessage( validatorConfig: {}, validatorName: string, validatorValue?: any) {
        let config = validatorConfig;
        return config[validatorName];
    }

    emailValidator(control) {
        if (control.value != null) {
            // RFC 2822 compliant regex
            /* tslint:disable:max-line-length */
            if (control.value.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/)) {
                return null;
            } else {
                return { 'invalidEmailAddress': true };
            }
            /* tslint:enable:max-line-length */
        }
    }

    phoneValidator(control) {
        if (control.value != null) {
            const validNumberPipe = new IsValidNumberPipe(this.cms);
            if (validNumberPipe.transform(control.value, true)) {
                return null;
            } else {
                return { 'invalidPhoneNumber': true };
            }
        }
    }

    passwordValidator(control) {
        if (control.value != null) {
            // {6,100}           - Assert password is between 6 and 100 characters
            // (?=.*[0-9])       - Assert a string has at least one number
            if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                return null;
            } else {
                return { 'invalidPassword': true };
            }
        }
    }

    passwordsMatchValidator(group: FormGroup) {
        let values: string[] = map(group.controls, control => control.value);
        if (every(values, v => v === values[0])) {
            return null;
        } else {
            return { 'passwordsDoNotMatch': true };
        }
    }

    creditCardValidator(control) {
        if (control.value != null) {
            // Vise, MasterCar, Amex, Discover, Dinners Club, JCB
            /* tslint:disable:max-line-length */
            if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                return null;
            } else {
                return { 'invalidCreditCard': true };
            }
            /* tslint:disable:max-line-length */
        }
    }

    nameValidator(control) {
        if (control.value != null) {
            if (control.value.match(/^[a-zA-Z '\.\-]+$/)) {
                return null;
            } else {
                return { 'invalidName': true };
            }
        }
    }

    zipCodeValidator(control) {
        if (control.value != null) {
            if (control.value.match(/^\d{5}(?:([-\s])?\d{4})?$/)) {
                return null;
            } else {
                return { 'invalidZipCode': true };
            }
        }
    }

}
