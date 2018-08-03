import { Pipe, PipeTransform } from '@angular/core';
import { padStart } from 'lodash';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: string): string {
    return padStart(value, 2, '0');
  }

}
