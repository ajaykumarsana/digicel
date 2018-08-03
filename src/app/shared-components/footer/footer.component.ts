import { Component, OnInit,  OnChanges, SimpleChanges } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {

  currentYear: Date = new Date();
  target: '_blank' | '_self';

  constructor(public cms: CmsService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.getTwitterLink();
      this.getFacebookLink();
      this.getLinkedInLink();
    }
  }

  getTwitterLink() {
    let linkObj = this.cms.getFromProvider('socialLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang].twitter;
    return linkUrl;
  }

  getFacebookLink() {
    let linkObj = this.cms.getFromProvider('socialLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang].facebook;
    return linkUrl;
  }

  getLinkedInLink() {
    let linkObj = this.cms.getFromProvider('socialLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang].linkedin;
    return linkUrl;
  }


}
