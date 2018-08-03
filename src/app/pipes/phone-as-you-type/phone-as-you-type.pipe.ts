import { Pipe, PipeTransform } from '@angular/core';
import { AsYouType } from 'libphonenumber-js';
import { CmsService } from '../../services/cms';

@Pipe({
  name: 'phoneAsYouType'
})
export class PhoneAsYouTypePipe implements PipeTransform {
  constructor(private cms: CmsService) {}

  transform(value: string): string {
    const country = this.cms.getFromProvider('defaultCountry');
    const formatted = new AsYouType(country).input(value);
    // Get rid of extra " )" or ")" at end of area code until more digits follow
    return country === 'US' ? formatted.replace(/\s?\)$/, '') : formatted;
  }

}
