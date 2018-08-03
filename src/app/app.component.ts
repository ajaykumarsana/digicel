import { Component, ViewEncapsulation, OnChanges, SimpleChanges, OnInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CmsService } from 'services';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnChanges {
  constructor(
    public cms: CmsService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('MBE Easy UI');
    this.updateBodyClass();
    this.addGTMScript();
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.provider) {
      this.updateBodyClass();
      this.addGTMScript();
    }
  }

  updateBodyClass() {
    document.querySelector('body').classList.add(this.cms.getFromProvider('defaultTheme'));
  }

  addGTMScript() {
    let gtmID = this.cms.getFromProvider('gtmId');

    if (gtmID.length > 0) {
      let tag1 = document.createElement('script');
      /* tslint:disable:max-line-length */
      tag1.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmID}');`;
      document.head.appendChild(tag1);

      let tag2 = document.createElement('noscript');
      /* tslint:disable:max-line-length */
      tag2.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(tag2);
    }
  }

}
