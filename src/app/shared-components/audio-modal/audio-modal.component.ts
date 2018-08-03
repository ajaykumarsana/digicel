/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { CmsService, GroupService, UserService, AutoAttendantService, RecommendedGreetingService } from 'services';
import { WizardPage } from '../wizard-page';
import { Title } from '@angular/platform-browser';

export interface AudioModalInterface {
  audioType: 'voicemail' | 'autoAttendant' | 'userVoicemail';
  useModals: boolean;
}

@Component({
  selector: 'app-audio-modal',
  templateUrl: './audio-modal.component.html',
  styleUrls: ['./audio-modal.component.scss']
})
export class AudioModalComponent extends WizardPage implements AudioModalInterface, OnInit {
  audioType: 'voicemail' | 'autoAttendant' | 'userVoicemail';
  mapping: {}[];
  isFilePresent = false;
  companyName: string;
  userName: string;
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    public userService: UserService,
    private autoAttendantService: AutoAttendantService,
    private recommendedGreetingService: RecommendedGreetingService,
    private titleService: Title
  ) {
    super();
    this.companyName = groupService.group.groupName;
    this.userName = userService.user.fullName;
  }

  ngOnInit() {
    this.setPageTitle();
    if (this.audioType === 'autoAttendant') {
      this.mapping = [];
      let menu = this.autoAttendantService.autoAttendant.menu;
      for (let [key, control] of Object.entries(menu)) {

        let leadin = this.recommendedGreetingService.getLeadIn(menu[key].action, menu[key].description);
        if (leadin === 'To') {
          menu[key].description = menu[key].description.toLowerCase();
        }
        this.mapping.push({leadin: leadin, number: key.toLocaleLowerCase(), name: menu[key].description});
      }
    }
  }

  setPageTitle() {
    let audioTitle = '';
    if (this.audioType !== 'userVoicemail') {
      if (this.audioType === 'voicemail') {
        audioTitle = this.cms.get('company-voicemail-header');
      }
      if (this.audioType === 'autoAttendant') {
        audioTitle = this.cms.get('company-auto-attendant-header');
      }
    } else {
      audioTitle = this.cms.get('user-voicemail-header');
    }
    this.titleService.setTitle(audioTitle);
  }

  onFilePresent(event) {
    this.isFilePresent = event;
  }

}
