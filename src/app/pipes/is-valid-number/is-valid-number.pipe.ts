import { Pipe, PipeTransform } from '@angular/core';
import { parseNumber, parse } from 'libphonenumber-js';
import { CmsService } from '../../services/cms';

@Pipe({
  name: 'isValidNumber'
})
export class IsValidNumberPipe implements PipeTransform {
  constructor(private cms: CmsService) {}

  transform(value: string, parseFirst = false): boolean {
    const countryCode = this.cms.getFromProvider('defaultCountry');
    let number = value || '';
    const parsedPhone = parseFirst && parse(value, countryCode);
    if (parsedPhone) {
      number = parsedPhone.phone as string || '';
    }
    return Boolean(parseNumber(number, {defaultCountry: countryCode, extended: true}).phone);
  }

}
