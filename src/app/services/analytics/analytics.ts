import { CallDirections } from './callDirections';
import { DailyCallCounts } from './dailyCallCounts';
import { CallTypes } from './callTypes';

export interface Analytics {
    callDirections: CallDirections;
    callTypes: CallTypes;
    dailyCallCounts: DailyCallCounts[];
    histogram: {};
 }
