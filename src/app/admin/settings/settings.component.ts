import { Component, OnInit } from '@angular/core';
import { CmsService, UserService } from 'services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isAdmin: boolean;
  multiLang: boolean;

  constructor(public cms: CmsService, private userService: UserService) { }

  ngOnInit() {
    this.isAdmin = this.userService.isAdmin();
    this.multiLang = this.cms.hasMoreThanOneLang();
  }

}
