import { Injectable } from '@angular/core';
import { CmsService } from '../cms';

@Injectable()
export class ApiErrors {
  constructor(private cms: CmsService) { }

// Status code translator from apis (this needs to be redesigned
// when we have more information...)
handleStatusCodes(statusCode: string): string {
    switch (statusCode) {
      case 'S0000':
        return 'success';
      case 'E3020':
        return this.cms.get('buyerErrors.noPhoneforAreaCode');
      case 'E3021':
        return this.cms.get('buyerErrors.invalidEmail');
      case 'E3022':
        return this.cms.get('buyerErrors.companyExists');
      case 'E3023':
        return this.cms.get('buyerErrors.emailExists');
      default:
        return this.cms.get('buyerErrors.unknownError');

    }
  }
}
