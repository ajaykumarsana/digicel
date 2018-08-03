import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { CmsService, GroupService, Group, VoicemailService, Voicemail } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-voicemail',
  templateUrl: './company-voicemail.component.html',
  styleUrls: ['./company-voicemail.component.scss']
})
export class CompanyVoicemailComponent implements OnInit, OnDestroy {
  group: Group;
  isFilePresent = false;
  voicemails: Voicemail[] = [];
  subscription: Subscription;
  public openVoicemail = false;

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    public voiceMailService: VoicemailService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('companyVoicemail'));
  }

  ngOnInit() {
    this.group = this.groupService.group;
    this.voiceMailService.changeUserPollingSpeed('fast');
    this.subscription = this.voiceMailService.companyVoicemails.subscribe(voicemails => {
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

  isVoicemailSet() {
    return this.isFilePresent;
  }

  toggleOpen() {
    this.openVoicemail = !this.openVoicemail;
  }

}
