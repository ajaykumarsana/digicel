import { SipConfig } from '../calling';
import { IAddress } from 'app/interfaces/address.interface';
import { cloneDeep } from 'lodash';

export class User {
  groupId: string;
  sip: SipConfig;
  xmpp: {username: string, password: string, host: string, 'phone-number': string, umsEndpoints: string[], endpoints: string[]};
  role: 'admin' | 'user';
  userId: string;
  device: boolean;
  voicemailGreetingUrl: string;
  serviceProviderId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  position: string;
  mobile: string;
  location: string;
  work: string;
  groupName: string;
  passwordExpired: boolean;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  billingPhone: string;
  shippingAndBillingAddressAreSame: boolean;
  portingServiceProvider: string;

  constructor(res: {}) {
    if (res && res['info']) {
      this.groupId = res['groupId'];
      this.sip = new SipConfig(res['sip']);
      this.xmpp = res['xmpp'];
      this.role = res['role'];
      this.userId = res['userId'];
      this.device = res['device'];
      this.voicemailGreetingUrl = res['voicemailGreetingUrl'];
      this.serviceProviderId = res['serviceProviderId'];
      this.firstName = res['info']['firstName'];
      this.lastName = res['info']['lastName'];
      this.phoneNumber = res['info']['phoneNumber'];
      this.email = res['info']['email'];
      this.position = res['info']['position'];
      this.mobile = res['info']['mobile'];
      this.location = res['info']['location'];
      this.work = res['info']['work'];
      this.groupName = res['info']['groupName'];
      this.passwordExpired = res['info']['passwordExpired'];
      this.shippingAndBillingAddressAreSame = false;

      this.billingAddress = {
        address1: null,
        address2: null,
        firstName: null,
        lastName: null,
        country: null,
        state: null,
        city: null,
        postalCode: null
      };

      this.shippingAddress = cloneDeep(this.billingAddress);
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get userIdWithoutDomain(): string {
    return this.userId.split('@')[0];
  }
}
