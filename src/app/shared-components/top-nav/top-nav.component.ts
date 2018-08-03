import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User, Group, CmsService, UserService, CallingService } from 'services';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() group: Group;
  @Input() config: 'admin' | 'onboarding';
  @Input() language = this.cms.getLanguage();
  @Input() isLoginPage = false;
  @Output() onClickPhone: EventEmitter<any> = new EventEmitter<any>();
  showSoftphone = false;
  helpLink = this.getHelpLink();

  constructor(
    private router: Router,
    public cms: CmsService,
    private userService: UserService,
    private callingService: CallingService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  onboardingLogout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/countryselector']);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.getHelpLink();
    }
  }

  getHelpLink() {
    let linkObj = this.cms.getFromProvider('helpLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    return linkUrl;
  }

  gotoLogoLink() {
    let linkObj = this.cms.getFromProvider('logoLinks');
    let lang = this.cms.getLanguage();
    let linkUrl = linkObj[lang];
    window.location.href = linkUrl;
  }


  showSoftPhone(): boolean {
    return !this.isLoginPage && this.callingService.callingEnabled && this.cms.getFromProvider('softPhoneEneabled');
  }

  showHelp(): boolean {
    return this.cms.getFromProvider('helpEneabled');
  }

  showDownloads(): boolean {
    return this.cms.getFromProvider('downloadsEneabled');
  }

  showSettings(): boolean {
    return this.cms.getFromProvider('settingsEneabled');
  }

  showPostTrial(): boolean {
    return this.cms.getFromProvider('postTrialEneabled');
  }

  showGLue(): boolean {
    return this.cms.getFromProvider('glueEneabled');
  }

  emitPhoneClick() {
    this.onClickPhone.emit();
  }

}
