import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CmsService, UserService, User, CallLogEntry } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent implements OnInit, OnDestroy {
  calls: CallLogEntry[] = [];
  callsSubscription: Subscription;
  pollingInterval = 10000; // 10 seconds
  callHistoryEmpty = true;

  constructor(
    public cms: CmsService,
    private userService: UserService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('callHistory'));
  }

  ngOnInit() {
    this.callsSubscription = Observable.timer(0, this.pollingInterval)
      .flatMap(() => this.userService.getCallLogs())
      .subscribe(callLog => {
        this.calls = callLog.calls;
        if (this.calls && (Object.keys(this.calls).length !== 0)) {
          this.callHistoryEmpty = false;
        }
      });
  }

  ngOnDestroy() {
    this.callsSubscription.unsubscribe();
  }

  isCallHistoryDataEmpty () {
    return !!this.callHistoryEmpty;
  }

}
