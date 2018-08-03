import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CmsService } from 'services';

@Component({
  selector: 'app-google-sso-button',
  templateUrl: './google-sso-button.component.html',
  styleUrls: ['./google-sso-button.component.scss']
})

export class GoogleSsoButtonComponent implements OnInit, OnDestroy {
  @Output() signedIn = new EventEmitter<{firstName: string, lastName: string, email: string}>();

  constructor(public cms: CmsService) {
    window['onGoogleSignIn'] = this.onSignIn.bind(this);
  }

  ngOnInit() {
    this.loadGoogleScript();
  }

  ngOnDestroy() {
    document.getElementById('google-script').remove();
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    this.signedIn.emit({
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail()
    });
  }

  private loadGoogleScript() {
    const node = document.createElement('script');
    node.id = 'google-script';
    node.src = 'https://apis.google.com/js/platform.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
