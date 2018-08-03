import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { TeamMember, ChatService, UnreadMessages, CmsService } from 'services';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {
  @Input() teamMembers: TeamMember[] = [];
  @Input() open = false;
  unreadMessageSubscription: Subscription;
  unreadMessages: UnreadMessages;

  constructor(
    private chatService: ChatService,
    public cms: CmsService
  ) { }

  ngOnInit() {
    this.unreadMessageSubscription = this.chatService.getUnreadMessages()
      .subscribe(unreadMessages => this.unreadMessages = unreadMessages);
  }

  numberOfUnreadMessages(teamMember: TeamMember): number {
    let messageList = this.unreadMessages[teamMember.IMPId] || [];
    return messageList.length;
  }

  ngOnDestroy() {
    this.unreadMessageSubscription.unsubscribe();
  }

}
