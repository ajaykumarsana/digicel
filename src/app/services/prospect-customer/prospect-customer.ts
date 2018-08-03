import { IAddress } from 'interfaces';

export class ProspectCustomer {
  public firstName: string;
  public lastName: string;
  public company: string;
  public companyAddress: IAddress;
  public email: string;
  public phone: string;
  public areaCode: string;
  public nxxCode: string;
  public autoAttendantPhone: string;
  public callQueuePhone: string;
  public voiceMessagingPhone: string;
  public faxNumber: string;
  public portingPhoneNumber: string;
  // Biz rule: The person who signs up will always be an admin
  public mainUser = true;

  constructor(object: {}) {
    this.firstName = object['firstName'];
    this.lastName = object['lastName'];
    this.company = object['company'];
    this.companyAddress = object['companyAddress'] || {};
    this.email = object['email'];
    this.phone = object['phone'];
    this.areaCode = object['areaCode'];
    this.nxxCode = object['nxxCode'];
    this.autoAttendantPhone = object['autoAttendantPhone'];
    this.callQueuePhone = object['callQueuePhone'];
    this.voiceMessagingPhone = object['voiceMessagingPhone'];
    this.faxNumber = object['faxNumber'];
    this.portingPhoneNumber = object['portingPhoneNumber'];
  }

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

}
