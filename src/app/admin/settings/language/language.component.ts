import { Component, OnInit } from '@angular/core';
import { CmsService } from 'services';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  multiLang: boolean;

  constructor(
    private router: Router,
    public cms: CmsService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('languageHeader'));
   }

  ngOnInit() {
    this.multiLang = this.cms.hasMoreThanOneLang();
    if (this.multiLang === false) {
      this.router.navigate(['/admin']);
    }
  }
}
