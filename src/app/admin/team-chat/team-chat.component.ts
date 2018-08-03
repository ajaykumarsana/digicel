import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GroupService, TeamMember, CmsService, ChatService, Message } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-team-chat',
    templateUrl: './team-chat.component.html',
    styleUrls: ['./team-chat.component.scss']
})

export class TeamChatComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('chatDisplayArea') chatDisplayArea;

    chatTextEntryNative: any;
    chatDisplayAreaNative: any;
    teamMember: TeamMember;
    routeSubsription: Subscription;
    messageSubscription: Subscription;
    newMessage = '';
    error = '';
    messages: Message[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService,
        public cms: CmsService,
        private chatService: ChatService,
        private titleService: Title
    ) {
        this.titleService.setTitle(this.cms.get('teamMembers'));
    }

    ngOnInit(): void {
        // Poll more frequently for messages
        this.chatService.changeChatMode(true);

        this.routeSubsription = this.route.params.subscribe(params => {
            if (!params['memberId']) {
                this.router.navigate(['admin', 'team', this.groupService.getDefaultOtherTeamMemberId()]);
                return;
            }

            // If changing from one team member to another
            if (this.messageSubscription) {
                this.onSwitchingTeamMemberOrDestroy();
            }

            this.teamMember = this.groupService.getMemberById(params['memberId']);

            this.messageSubscription = this.chatService.getMessagesFromUser(this.teamMember.IMPId)
                .subscribe(messages => {
                    this.messages = messages;
                    this.chatService.messagesWereViewed(this.messages.filter(msg => !msg.read && !msg.isSender));
                });
        });
    }

    ngAfterViewInit(): void {
        // Setup native reference from angular ViewChild
        this.chatDisplayAreaNative = this.chatDisplayArea.nativeElement;
        // Scroll chat div to the bottom after view is rendered
        this.chatDisplayAreaNative.scrollTop = this.chatDisplayAreaNative.scrollHeight;
    }

    getMemberNameByIMPId(IMPId: string): string {
        if (this.groupService.getMemberByIMPId(IMPId)) {
            let member = this.groupService.getMemberByIMPId(IMPId);
            return member.fullName;
        }
    }

    sendMessage(keypress, event) {
        if (keypress === true && event.which === 13 && event.shiftKey === false) {
            this.processMessage();
            // Prevent default behavor of cursor sticking to second line
            return false;
        } else if (keypress === false) {
            this.processMessage();
            // Prevent default behavor of cursor sticking to second line
            return false;
        }
    }

    processMessage() {
        this.error = '';
        const message = this.newMessage;
        this.newMessage = '';
        // Show message immediately (will be replaced by API version of the msg on next poll)
        this.messages.push({ body: message, isSender: true });
        this.chatDisplayAreaNative.scrollTop = this.chatDisplayAreaNative.scrollHeight;
        this.chatService.sendChat(this.teamMember.IMPId, message)
            .subscribe(() => {
                this.chatDisplayAreaNative.scrollTop = this.chatDisplayAreaNative.scrollHeight;
             }, err => {
                this.error = err;
            });
    }

    ngOnDestroy() {
        this.routeSubsription.unsubscribe();
        this.onSwitchingTeamMemberOrDestroy();
        // Stop polling so frequently for messages
        this.chatService.changeChatMode(false);
    }

    onSwitchingTeamMemberOrDestroy() {
        if (this.messageSubscription) {
            // 1. Stop subscribing to incoming chats from the old user
            this.messageSubscription.unsubscribe();
            // 2. Mark the old users' messages as read
            this.chatService.syncReadMessagesWithServer();
        }
    }

}
