import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'durationFromMilliseconds'
})
export class DurationFromMillisecondsPipe implements PipeTransform {

  transform(value: string): string {
    let numValue = Math.round(parseFloat(value));
    let minutes = Math.floor((numValue % 3600000) / 60000).toString(); // 1 Minutes = 60000 Milliseconds
    if (minutes.length === 1 ) {
      minutes = '0' + minutes;
    }
    let seconds = Math.floor(((numValue % 360000) % 60000) / 1000).toString(); // 1 Second = 1000 Milliseconds
    if (seconds.length === 1 ) {
      seconds = '0' + seconds;
    }
    let duration = `${minutes}:${seconds}`;
    return duration;
  }

}
