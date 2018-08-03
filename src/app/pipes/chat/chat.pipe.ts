import { Pipe, PipeTransform } from '@angular/core';
import * as AutoLinker from 'autoLinker';

@Pipe({
  name: 'chat'
})
export class ChatPipe implements PipeTransform {

  private autoLinkerOptions: Object = {
    hashtag: 'twitter',
    mention: 'twitter'
  };
  private autoLinker: AutoLinker = new AutoLinker(this.autoLinkerOptions);

  transform(message: string): string {
    let trimmedMessage = message.trim();
    let linkedMessage = this.autoLinker.link(trimmedMessage);
    return linkedMessage;
  }

}
