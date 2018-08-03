import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  public checkModel = false;

  constructor(public cms: CmsService) { }

  ngOnInit() {
  }

  onChange(event) {
    this.checkModel = event.target.checked;
  }

  getTermsAndConditionsText() {
    let linkObj = this.cms.getFromProvider('ptueTermsAndConditionsText');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

  getTermsAndConditionsLink() {
    let linkObj = this.cms.getFromProvider('ptueTermsAndConditionsLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

}
