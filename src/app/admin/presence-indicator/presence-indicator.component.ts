import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { PresenceService, Statuses, Status, CmsService, TeamMember } from 'services';

@Component({
  selector: 'app-presence-indicator',
  templateUrl: './presence-indicator.component.html',
  styleUrls: ['./presence-indicator.component.scss']
})
export class PresenceIndicatorComponent implements OnInit, OnDestroy {
  @Input() teamMember: TeamMember;
  @Input() type: 'no-label' | 'full';
  statuses: Statuses = {};
  statusSubscription: Subscription;

  constructor(
    private presenceService: PresenceService,
    public cms: CmsService
  ) { }

  ngOnInit() {
    this.statusSubscription = this.presenceService.statuses
      .subscribe(statuses => this.statuses = statuses);
  }

  getStatus(): Status | '' {
    const status = this.teamMember ? this.statuses[this.teamMember.IMPId] : null;
    return status || '';
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

}
