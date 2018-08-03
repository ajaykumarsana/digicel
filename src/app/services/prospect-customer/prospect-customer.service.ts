import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ProspectCustomer } from './prospect-customer';
import { ApiService, ApiErrors } from '../api';
import { CmsService } from '../cms';
import { PhoneNumbersService } from '../phone-numbers';

@Injectable()
export class ProspectCustomerService {
  public prospectCustomer: ProspectCustomer;
  public availablePhoneNumbers: string[];
  private serviceProviderId: string;
  private lineLimit: number;

  constructor(
    private apiService: ApiService,
    private apiErrors: ApiErrors,
    private cms: CmsService,
    private phoneService: PhoneNumbersService
  ) {
    this.serviceProviderId = this.cms.getEngine();
    this.prospectCustomer = new ProspectCustomer(JSON.parse(sessionStorage.getItem('prospect-customer')) || {});
    this.availablePhoneNumbers = JSON.parse(sessionStorage.getItem('phones')) || [];
    this.lineLimit = this.cms.getFromProvider('maxUsers');
  }

  // Saves prospectCustomer to session storage
  cacheProspectCustomer(): void {
    sessionStorage.setItem('prospect-customer', JSON.stringify(this.prospectCustomer));
  }


  // Calls api to determine if the customer has valid sign up data (doesn't already exist)
  validateCustomer() {
    const path = `${this.serviceProviderId}/login/validate`;
    const payload = {
      firstName: this.prospectCustomer.firstName,
      lastName: this.prospectCustomer.lastName,
      email: this.prospectCustomer.email,
      company: this.prospectCustomer.company
    };

    return this.apiService.call('speed', 'post', path, payload)
      .map(res => {
        if (res.statusCode === 'S0000') {
          return res;
        } else {
          throw new Error(this.apiErrors.handleStatusCodes(res.statusCode));
        }
      });
  }

  generatePhoneNumbers(): Observable<string[]> {
    return this.phoneService.generatePhoneNumbers(this.prospectCustomer.areaCode, this.lineLimit + 4, this.prospectCustomer.nxxCode);
  }

  assignPhoneNumbers(): 'ok' | 'insufficientNumbers' {
    if (this.availablePhoneNumbers.length < this.lineLimit + 4) {
      return 'insufficientNumbers';
    }

    this.prospectCustomer.phone = this.availablePhoneNumbers[0];
    this.prospectCustomer.autoAttendantPhone = this.prospectCustomer.phone;
    this.prospectCustomer.callQueuePhone = this.availablePhoneNumbers[1];
    this.prospectCustomer.voiceMessagingPhone = this.availablePhoneNumbers[2];
    // Make sure to clear out fax number if fax line is not requested.
    this.prospectCustomer.faxNumber = this.availablePhoneNumbers[3];

    this.availablePhoneNumbers.splice(0, 4);
    this.cacheProspectCustomer();
    this.phoneService.cachePhoneNumbers();
    return 'ok';
  }

  savePhoneSettings(hasFax: boolean) {
    if (!hasFax) {
      this.prospectCustomer.faxNumber = undefined;
    }
    this.cacheProspectCustomer();
  }

  isPorting(): boolean {
    return !!this.prospectCustomer.portingPhoneNumber;
  }

}
