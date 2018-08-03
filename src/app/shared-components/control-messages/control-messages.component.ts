import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService, CmsService } from 'services';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {
  @Input() control: FormControl;

  constructor(public cms: CmsService, private formValidationService: FormValidationService) { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.formValidationService.getValidatorErrorMessage(
          this.cms.get('formValidations'), propertyName, this.control.errors[propertyName]
        );
      }
    }
    return null;
  }

}
