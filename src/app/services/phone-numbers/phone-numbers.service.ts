import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService, ApiErrors } from '../api';
import { CmsService } from '../cms';
import { PortabilityCheck } from './portabilityCheck';


/**
 * @description Phone Number service to manage phone number generation and cycling across portals
*/
@Injectable()
export class PhoneNumbersService {

  public phoneNumbers: Array<string>;
  public serviceProviderId: string;
  private portabilityCheck: PortabilityCheck;

  constructor(public apiService: ApiService, public apiErrors: ApiErrors, public cms: CmsService) {
    // Possible issues with local storage reliance this cross application.
    this.phoneNumbers = JSON.parse(sessionStorage.getItem('phones')) || [];
    this.serviceProviderId = this.cms.getEngine();
  }

  // Generates an array of phone numbers
  generatePhoneNumbers(areaCode: string, numberOfLines: number, nxx?: string): Observable<string[]> {
    if (this.phoneNumbers && this.phoneNumbers.length > 0) {
      return Observable.of(this.phoneNumbers);
    } else {
      let tryCount = 0;
      let path = `${this.serviceProviderId}/order/lines/${areaCode}?limit=${numberOfLines}&`;
      if (nxx) {
        path = `${this.serviceProviderId}/order/lines/${areaCode}?limit=${numberOfLines}&nxx=${nxx}&`;
      }
      return this.apiService.call('speed', 'get', path).map(phoneNumbers => {
        if (phoneNumbers.statusCode === 'S0000') {
          if (phoneNumbers.phLines.length < numberOfLines) {
            throw new Error('E3020');
          } else {
            sessionStorage.setItem('phones', JSON.stringify(phoneNumbers.phLines));
            return this.phoneNumbers = phoneNumbers.phLines;
          }
        } else {
          throw new Error(this.apiErrors.handleStatusCodes(phoneNumbers.statusCode));
        }
      })
      .catch(
        (err) => {
          const error = Observable.throw(
            new Error(this.cms.get('insufficientNumbers', areaCode))
          );
          tryCount += 1;
          return error;
      })
      .retry(1);
    }
  }

  // Cycles through to the next available phone number in the phone number array
  cyclePhoneNumber(): string {
      const phone = this.phoneNumbers.shift();
      this.cachePhoneNumbers();
      return phone;
  }

  // Allows for a number that was pulled to be reused
  recyclePhoneNumber(phoneNumber: string) {
    this.phoneNumbers.unshift(phoneNumber);
    this.cachePhoneNumbers();
  }

  // Stores phone numbers in local storage to prevent extra api calls
  cachePhoneNumbers() {
    sessionStorage.setItem('phones', JSON.stringify(this.phoneNumbers));
  }

  // Checks if a phone number is eligible for buyer-porting.
  checkPortingEligibility(phoneNumber: string): Observable<PortabilityCheck> {
    const cleanPortingPhone = phoneNumber.replace(/\D/g, '');
    const path = `${this.serviceProviderId}/order/port/${cleanPortingPhone}`;
    return this.apiService.call('speed', 'get', path)
    .map(portabilityCheck => {
      // const updatedTeamMember = new TeamMember(res['profile']);
      // const i = this.teamMembers.indexOf(oldTeamMember);
      // return this.teamMembers[i] = updatedTeamMember;
      this.portabilityCheck = portabilityCheck;
      console.log('this is  checkPortingEligibility response = ', portabilityCheck);
      return portabilityCheck; // res.isPortable as boolean;
    });




    // return this.apiService.call('speed', 'get', path)
    //     .map(catalog => {
    //       sessionStorage.setItem('catalog', JSON.stringify(catalog));
    //       return this.catalog = catalog;
    //     });
    // }




      // .map(res => res.isPortable as boolean);
  }


}
