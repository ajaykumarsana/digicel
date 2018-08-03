import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { CmsService, UserService, User, VoicemailService, Voicemail } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-voicemail',
  templateUrl: './user-voicemail.component.html',
  styleUrls: ['./user-voicemail.component.scss']
})
export class UserVoicemailComponent implements OnInit, OnDestroy {
  user: User;
  isFilePresent = false;
  voicemails: Voicemail[] = [];
  subscription: Subscription;
  public openVoicemail = false;

  constructor(
    public cms: CmsService,
    public userService: UserService,
    public voiceMailService: VoicemailService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('voicemail'));
   }

  ngOnInit() {
    this.user = this.userService.user;
    this.voiceMailService.changeUserPollingSpeed('fast');
    this.subscription = this.voiceMailService.userVoicemails.subscribe(voicemails => {
      this.voicemails = voicemails;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.voiceMailService.changeUserPollingSpeed('slow');
  }

  onFilePresent(event: boolean) {
    this.isFilePresent = event;
  }

  toggleOpen() {
    this.openVoicemail = !this.openVoicemail;
  }

}
