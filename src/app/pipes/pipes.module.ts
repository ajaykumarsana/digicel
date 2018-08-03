import { NgModule } from '@angular/core';
import { DialablePhonePipe } from './dialable-phone';
import { TimeFromNowPipe } from './time-from-now';
import { PhonePipe } from './phone';
import { PhoneAsYouTypePipe } from './phone-as-you-type';
import { AudioTimePipe } from './audio-time';
import { CountPipe } from './count';
import { FilterPipe } from './filter';
import { ChatPipe } from './chat';
import { IsValidNumberPipe } from './is-valid-number';
import { ZipCodePipe } from './zipcode';
import { DurationFromMillisecondsPipe } from './duration-from-milliseconds';

@NgModule({
    imports: [],
    exports: [TimeFromNowPipe, PhonePipe, PhoneAsYouTypePipe, DialablePhonePipe, CountPipe, AudioTimePipe, FilterPipe, ChatPipe,
        IsValidNumberPipe, ZipCodePipe, DurationFromMillisecondsPipe],
    declarations: [TimeFromNowPipe, PhonePipe, PhoneAsYouTypePipe, DialablePhonePipe, CountPipe, AudioTimePipe, FilterPipe, ChatPipe,
        IsValidNumberPipe, ZipCodePipe, DurationFromMillisecondsPipe],
    providers: [],
})
export class PipesModule { }
