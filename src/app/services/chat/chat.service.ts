import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { Message } from './message';
import { UnreadMessages } from './unread-messages';

@Injectable()
export class ChatService {
  private username: string;
  private udid: string;
  // Fetched on login
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  // Fetched on login
  public messages: Observable<Message[]> = this.messagesSubject.asObservable();
  private viewedMessageIds: string[] = [];
  private options: { chatModePollingInterval: number, standardPollingInterval: number } = {
    chatModePollingInterval: 3000,
    standardPollingInterval: 10000
  };
  // Poll more frequently for messages in chatMode
  private chatMode = false;
  private msgPollingSubscription: Subscription;

  constructor(private apiService: ApiService, private cms: CmsService) { }

  initialize(username: string, udid: string) {
    this.username = username;
    this.udid = udid;
    this.msgPollingSubscription = this.pollMessages().subscribe();
  }

  changeChatMode(newMode: boolean): void {
    if (this.chatMode !== newMode) {
      this.chatMode = newMode;
      this.msgPollingSubscription.unsubscribe();
      this.msgPollingSubscription = this.pollMessages().subscribe();
    }
  }

  stopPollingForMessages(): void {
    this.msgPollingSubscription.unsubscribe();
  }

  sendChat(toJid: string, message: string): Observable<any> {
    return this.apiService.call('ums', 'post', `gateway/v2/msg/send/${this.udid}`,
      {
        message: {
          from: `${this.username}/${this.udid}`,
          to: toJid,
          type: 'chat',
          body: message,
          lang: this.cms.getLanguage()
        }
      });
  }

  getMessages(): Observable<Message[]> {
    return this.apiService.call('ums', 'get', `gateway/v2/msg/history/${this.udid}/0`)
      .map(res => res && res['messages'] ? res['messages'] : []);
  }

  // Poll for messages and emit via this.messages Observable
  pollMessages() {
    const pollingInterval = this.chatMode ? this.options.chatModePollingInterval : this.options.standardPollingInterval;
    return Observable.timer(0, pollingInterval)
      .flatMap(() => this.getMessages())
      .map(messages => {
        this.messagesSubject.next(this.showViewedAsRead(messages));
      });
  }

  getMessagesFromUser(otherUserId: string): Observable<Message[]> {
    return this.messages.map(messages => {
      return messages.filter(msg => [msg.to, msg.from].includes(otherUserId)).reverse();
    });
  }

  // Return all unread messages, arranged by who sent them
  getUnreadMessages(): Observable<UnreadMessages> {
    return this.messages.map(messages => {
      const unread: UnreadMessages = {};
      messages.forEach((msg: Message) => {
        if (!msg.read && !msg.isSender) {
          if (unread[msg.from]) {
            unread[msg.from].push(msg);
          } else {
            unread[msg.from] = [msg];
          }
        }
      });
      return unread;
    });
  }

  messagesWereViewed(messages: Message[]) {
    messages.forEach(msg => {
      this.viewedMessageIds.push(msg.msgid);
    });
  }

  anyReadMessagesToPost(): boolean {
    return this.viewedMessageIds.length > 0;
  }

  postViewedMessagesAsRead(): Observable<any> {
    const msgids = this.viewedMessageIds;
    return this.sendReadMessagesToApi(msgids).map(() => {
      // Clear the queue of all the msgids that were rec'd by the API
      this.viewedMessageIds.filter(msgid => !msgids.includes(msgid));
    });
  }

  sendReadMessagesToApi(msgIds: string[]) {
    const readMessages = msgIds.map(msgid => {
      return { msgid: msgid };
    });
    return this.apiService.call('ums', 'post', `gateway/v2/msg/read/${this.udid}`,
      { readMessages: readMessages });
  }

  syncReadMessagesWithServer(): void {
    if (this.anyReadMessagesToPost()) {
      this.postViewedMessagesAsRead()
        .subscribe(() => console.log('read messages posted to server'));
    }
  }

  // If we know a message has been viewed, mark it as read, even if the API doesn't know it has been read
  private showViewedAsRead(messages: Message[]): Message[] {
    return messages.map(msg => {
      if (this.viewedMessageIds.includes(msg.msgid)) {
        msg.read = true;
      }
      return msg;
    });
  }

}
