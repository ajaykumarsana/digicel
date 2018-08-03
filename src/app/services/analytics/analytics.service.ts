import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { UserService } from '../user';
import { Analytics } from './analytics';
import { Call, DailyCallCounts, CallTypes, CallDirections} from 'services';

@Injectable()
export class AnalyticsService {
  serviceProviderId: string;
  analytics: Analytics;
  callTypes: CallTypes;
  dailyCallCounts: DailyCallCounts[];
  callDirections: CallDirections;

  constructor(private userService: UserService, private cms: CmsService, private apiService: ApiService) {
    this.serviceProviderId = this.cms.getEngine();
  }

  getCompanyAnalyticsFromApi(): Observable<Analytics> {
    const groupId = this.userService.user.groupId;
    const path = `${this.serviceProviderId}/group/${groupId}/analytics`;
    return this.apiService.call('speed', 'get', path)
      .map(analytics => {
        this.analytics = analytics;
          this.callDirections = analytics.callDirections;
          this.callTypes = analytics.callTypes;
          this.dailyCallCounts = analytics.dailyCallCounts;
        return analytics;
      });
  }
}
