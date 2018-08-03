import { Pipe, PipeTransform } from '@angular/core';
import { parse, formatNumber } from 'libphonenumber-js';
import { CmsService } from '../../services/cms/cms.service';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  constructor(private cms: CmsService) {}

  transform(value: string): string {
    const country = this.cms.getFromProvider('defaultCountry');

    // allow area code 200 for testing
    const areaCode200 = country === 'US' && /^\+1-?200/.test(value);
    if (areaCode200) {
      value = value.replace(/^\+1-?200/, '+1201');
    }
    value = value || '';
    const parsedNumber = parse(value, country).phone || '';
    let formattedNumber = formatNumber(parsedNumber, country, 'National') || '';
    if (areaCode200) {
      return formattedNumber.replace('(201)', '(200)');
    } else {
      return formattedNumber;
    }
  }

}
