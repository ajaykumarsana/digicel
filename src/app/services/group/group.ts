import { Customer } from './customer';
import { HuntGroup } from '../../shared-components/hunt-group/hunt-group';
import { Greeting } from './greeting';
import { MainLine } from './main-line';
import { AutoAttendant } from '../auto-attendant/attendant';

export class Group {
  attendant: AutoAttendant;
  greetings: Greeting;
  mainLine: MainLine;
  groupId: string;
  groupName: string;
  serviceProviderId: string;
  customer: Customer;

  phoneNumber: string;
  autoAttendantId: string;
  autoAttendant: string;
  receptionist: any; // not sure
  huntGroups: HuntGroup[];
  phoneMenu: any; // not sure
  voicemail: string; // not sure
  // behavior: any; // not sure
  behavior: 'autoAttendant' | 'receptionist' | 'voicemail';

  trialInfo: {isTrial: boolean, daysRemaining: number, trialEndDate: string, trialStartDate: string};

  constructor(res: {}) {
    this.attendant = res['attendant'];
    this.greetings = res['greetings'];
    this.mainLine = res['mainLine'];
    this.groupId = res['groupId'];
    this.groupName = res['groupName'];
    this.serviceProviderId = res['serviceProviderId'];
    this.customer = res['customer'];

    this.phoneNumber = res['mainLine']['phoneNumber'] || '';
    // this.autoAttendantId = res['attendant']['autoAttendantId'];
    this.autoAttendant = res['greetings']['autoAttendant'];
    this.voicemail = res['greetings']['voicemail'];
    this.behavior = res['mainLine']['destination'];
    this.receptionist = res['mainLine']['receptionistUser'];
    this.huntGroups = res['huntGroup'];
    this.phoneMenu = res['phoneMenu'];
    this.trialInfo = res['trialInfo'] || {};
  }

}
