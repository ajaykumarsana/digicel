import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public cms: CmsService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('contactUsHeader'));
   }

  ngOnInit() {
  }

  launchChat() {
    console.log('launchChat clicked');
  }

}
