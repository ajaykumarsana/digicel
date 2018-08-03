import { CallLogEntry } from './call-log-entry';

export class CallLog {
  calls: CallLogEntry[] = [];

  constructor(res: { received: {}, missed: {}, placed: {} }) {
    ['received', 'missed', 'placed'].forEach((callType: 'received' | 'missed' | 'placed') => {
      let callLog = res[callType] as any[];
      callLog.forEach(call => {
        this.calls.push(new CallLogEntry(call, callType));
      });
    });

    // Show the most recent calls at the top of the list
    this.calls.sort((a, b) => b.time.getTime() - a.time.getTime());
  }
}
