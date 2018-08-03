import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { User } from '../user';
import { VcardHelper } from './vcard-helper';

@Injectable()
export class AvatarService {
  user: User;
  username: string;
  udid: string;
  // Fetched on login
  userVcard: VcardHelper;
  // Fetched on login
  vcards: {[userId: string]: VcardHelper};
  defaultImage = 'assets/images/defaultThumbnail_300.jpg';

  constructor(private sanitizer: DomSanitizer, private apiService: ApiService) { }

  initialize(user: User, username: string, udid: string) {
    this.user = user;
    this.username = username;
    this.udid = udid;
  }

  getVcardsFromApi(jids: string[]): Observable<{ [userId: string]: VcardHelper }> {
    return this.apiService.call('ums', 'post', 'gateway/userinfo/vcard', {
      jids: jids
    }).map(res => {
      const vcards = {};
      if (res && res['vcards']) {
        res['vcards'].forEach(element => {
          try {
            vcards[element['jid']] = new VcardHelper(element['vcard']);
          } catch (e) {
            console.log('Unable to parse v-card. Continuing... ', e);
          }
        });
      }

      this.vcards = vcards;
      this.userVcard = this.vcards[this.username] || new VcardHelper();
      return this.vcards;
    });
  }

  updateUserAvatar(imageUri): Observable<any> {
    this.userVcard.setAvatarFromDataUri(imageUri);
    return this.updateUserVcard(this.userVcard);
  }

  getUserAvatar(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.userVcard.getAvatarSrc() || this.defaultImage);
  }

  getAvatar(userId: string): SafeUrl {
    if (userId === this.username) {
      return this.getUserAvatar();
    }

    const vcard = this.vcards[userId];
    if (vcard) {
      return this.sanitizer.bypassSecurityTrustUrl(vcard.getAvatarSrc() || this.defaultImage);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(this.defaultImage);
    }
  }

  private updateUserVcard(vcardHelper: VcardHelper): Observable<any> {
    return this.apiService.call('ums', 'put',
      `gateway/v2/userinfo/vcard/${this.username}`, {
        vcard: vcardHelper.toBase64(),
        udid: this.udid
      });
  }

}
