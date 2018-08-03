import { Component, OnInit } from '@angular/core';
import { CmsService, FormValidationService } from 'services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ControlMessagesComponent } from 'components';

@Component({
  selector: 'app-loa',
  templateUrl: './loa.component.html',
  styleUrls: ['./loa.component.scss']
})
export class LOAComponent implements OnInit {
  public confirmForm: FormGroup;
  public checkModel = false;

  constructor(public cms: CmsService, private fb: FormBuilder, private formValidationService: FormValidationService) {
    this.confirmForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, this.formValidationService.nameValidator]))
    });
  }

  ngOnInit() {
  }

  onChange(event) {
    this.checkModel = event.target.checked;
  }

  getLOAText() {
    let linkObj = this.cms.getFromProvider('loaDocumentsText');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

  getLOALink() {
    let linkObj = this.cms.getFromProvider('loaDocumentLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

}
