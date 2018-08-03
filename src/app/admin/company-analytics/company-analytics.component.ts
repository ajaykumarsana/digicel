import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CmsService, AnalyticsService, Analytics} from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-analytics',
  templateUrl: './company-analytics.component.html',
  styleUrls: ['./company-analytics.component.scss']
})
export class CompanyAnalyticsComponent implements OnInit, OnDestroy {
  analytics: Analytics;
  analyticsSubscription: Subscription;
  pollingInterval = 10000; // 10 seconds

  constructor(
    public cms: CmsService,
    private analyticsService: AnalyticsService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('teamAnalytics'));
   }

  ngOnInit() {
    this.analyticsSubscription = Observable.timer(0, this.pollingInterval)
      .flatMap(() => this.analyticsService.getCompanyAnalyticsFromApi())
      .subscribe(analytics => {
        this.analytics = analytics;
      });
  }

  ngOnDestroy() {
    this.analyticsSubscription.unsubscribe();
  }

}
