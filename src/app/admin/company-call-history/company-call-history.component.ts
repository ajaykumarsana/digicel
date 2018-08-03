import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CmsService, CallLogEntry, GroupService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-call-history',
  templateUrl: './company-call-history.component.html',
  styleUrls: ['./company-call-history.component.scss']
})
export class CompanyCallHistoryComponent implements OnInit, OnDestroy {
  calls: CallLogEntry[] = [];
  callsSubscription: Subscription;
  pollingInterval = 10000; // 10 seconds
  callHistoryEmpty = true;

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('companyCallHistory'));
  }

  ngOnInit() {
    this.callsSubscription = Observable.timer(0, this.pollingInterval)
      .flatMap(() => this.groupService.getCompanyCallLog())
      .subscribe(calls => {
        this.calls = calls;
        if (this.calls && (Object.keys(this.calls).length !== 0)) {
          this.callHistoryEmpty = false;
        }
      });
  }

  isCallHistoryDataEmpty () {
    return !!this.callHistoryEmpty;
  }

  ngOnDestroy() {
    this.callsSubscription.unsubscribe();
  }

}
