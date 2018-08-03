import { Pipe, PipeTransform } from '@angular/core';

/*
 * Place dash vetween fifth and nine digit zip codes
 * Takes a string as a value.
 * Usage:
 *  value | myZipCode
 * Example:
 *  // value.name = 112076420
 *  {{ value.name | myZipCode  }}
 *  formats to: 11207-6420
*/

@Pipe({
  name: 'myZipCode'
})
export class ZipCodePipe implements PipeTransform {
  transform(zipcode: string): string {
    if (!zipcode) {
      return '';
    }

    zipcode = (zipcode.match(/\d+/g) || [] ).join('');

    if (zipcode.length === 5) {
      return zipcode.slice(0, 5);
    } else if (zipcode.length === 9) {
      return zipcode.slice(0, 5) + '-' + zipcode.slice(5);
    } else {
      return zipcode;
    }
  }
}


