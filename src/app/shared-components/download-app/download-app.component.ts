import { Component, OnInit, Input } from '@angular/core';
import { CmsService, CatalogService, Download } from 'services';
import { Subscription } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {

  @Input() displayMode;

  public userAgent: string;
  public platform: string;
  public downloads: Download[];
  public platforms = [];
  private os = null;

  constructor(
    public cms: CmsService,
    private catalogService: CatalogService,
    private titleService: Title,
  ) {
    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;
  }

  ngOnInit() {
    console.log('this.displayMode = ', this.displayMode);
    if (this.displayMode !== 'simple') {
      this.titleService.setTitle(this.cms.get('downloadAppHeader'));
    }
    this.catalogService.getCatalog().subscribe(catalog => {
      this.downloads = catalog.downloads;
      this.makePlatformArray(this.downloads);
    });
  }

  makePlatformArray(downloads) {
    let platformArr = [];
    downloads.forEach(download => {
      platformArr.push(download.platform);
    });
    this.platforms = platformArr;
  }

  getplatform() {
    let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    let iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(this.platform) !== -1) {
      this.os = 'mac';
    } else if (iosPlatforms.indexOf(this.platform) !== -1) {
      this.os = 'ios';
    } else if (windowsPlatforms.indexOf(this.platform) !== -1) {
      this.os = 'pc';
    } else if (/Android/.test(this.userAgent)) {
      this.os = 'android';
    } else if (!this.os && /Linux/.test(this.platform)) {
      this.os = 'linux';
    }
    return this.os;
  }
}
