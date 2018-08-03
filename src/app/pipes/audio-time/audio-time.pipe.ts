import { Pipe, PipeTransform } from '@angular/core';
import { padStart } from 'lodash';

@Pipe({
  name: 'audioTime'
})
export class AudioTimePipe implements PipeTransform {

  transform(value: string): string {
    let numValue = Math.round(parseFloat(value));
    let minutes = Math.floor(numValue / 60).toString();
    let seconds = (numValue % 60).toString();

    return padStart(minutes, 2, '0') + ':' + padStart(seconds, 2, '0');
  }

}
