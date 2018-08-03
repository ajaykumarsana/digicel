import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CmsService, SignUpFlowService } from 'services';

@Component({
  selector: 'app-brand-header',
  templateUrl: './brand-header.component.html',
  styleUrls: ['./brand-header.component.scss']
})
export class BrandHeaderComponent implements OnInit, OnChanges {
  @Input() language = this.cms.getLanguage();
  @Input() config = this.cms.getFromProvider('topnavConfig');

  navLink1Text = this.getNavLink1Text();
  navLink2Text = this.getNavLink2Text();
  navLink3Text = this.getNavLink3Text();
  navLink4Text = this.getNavLink4Text();
  navLink5Text = this.getNavLink5Text();
  navLink6Text = this.getNavLink6Text();

  public isPostCheckoutPage = false;

  constructor(public cms: CmsService, private suf: SignUpFlowService) {
    this.getNavLink1Text();
    this.getNavLink2Text();
    this.getNavLink3Text();
    this.getNavLink4Text();
    this.getNavLink5Text();
    this.getNavLink6Text();
   }

  ngOnInit() {
    this.isPostCheckoutPage = (this.suf.getCurrentPageUrl().indexOf('post-checkout') !== -1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.getNavLink1();
      this.getNavLink2();
      this.getNavLink3();
      this.getNavLink4();
      this.getNavLink5();
      this.getNavLink6();
      this.getNavLink1Text();
      this.getNavLink2Text();
      this.getNavLink3Text();
      this.getNavLink4Text();
      this.getNavLink5Text();
      this.getNavLink6Text();
    }
  }

  getNavLink1() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink1'];
    return linkUrl;
  }

  getNavLink2() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink2'];
    return linkUrl;
  }

  getNavLink3() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink3'];
    return linkUrl;
  }

  getNavLink4() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink4'];
    return linkUrl;
  }

  getNavLink5() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink5'];
    return linkUrl;
  }

  getNavLink6() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang]['navLink6'];
    return linkUrl;
  }

  getNavLink1Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink1Text'];
    this.navLink1Text = linkText;
  }

  getNavLink2Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink2Text'];
    this.navLink2Text = linkText;
  }

  getNavLink3Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink3Text'];
    this.navLink3Text = linkText;
  }

  getNavLink4Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink4Text'];
    this.navLink4Text = linkText;
  }

  getNavLink5Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink5Text'];
    this.navLink5Text = linkText;
  }

  getNavLink6Text() {
    let linkObj = this.cms.getFromProvider('navLinks');
    let lang = this.cms.getLanguage();
    let linkText = linkObj[lang]['navLink6Text'];
    this.navLink6Text = linkText;
  }

  gotoLogoLink() {
    let linkObj = this.cms.getFromProvider('logoLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    window.location.href = linkUrl;
  }


}
