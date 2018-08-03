import { Pipe, PipeTransform } from '@angular/core';
import { parse, formatNumber, CountryCode } from 'libphonenumber-js';
import { CmsService } from '../../services/cms';

@Pipe({
  name: 'dialablePhone'
})
export class DialablePhonePipe implements PipeTransform {
  constructor(private cms: CmsService) {}

  transform(value: string): string {
    const country = this.cms.getFromProvider('defaultCountry');
    const parsedNumber = parse(value, country);
    return formatNumber(parsedNumber, 'E.164') || '';
  }

}
