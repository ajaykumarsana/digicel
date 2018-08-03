import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AvatarService, CmsService } from 'services';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userId: string;
  @Input() size: 'large' | 'medium' | 'small' = 'large';
  @Input() selected = false;

  constructor(private avatarService: AvatarService, public cms: CmsService) { }

  ngOnInit() {
  }

  getAvatarSrc(): SafeUrl {
    return this.avatarService.getAvatar(this.userId);
  }

}
