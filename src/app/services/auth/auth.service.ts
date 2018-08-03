import { Injectable } from '@angular/core';
import { UserService, User } from '../user';

@Injectable()
export class AuthService {
private user: User;

constructor( private userService: UserService ) { }

  getAuthorizationToken() {
    let authToken = '';
    this.user = this.userService.user;
    if (this.user) {
      authToken = 'Basic ' + btoa(`${this.user.xmpp.username}:${this.user.xmpp.password}`);
    }
    return authToken;
  }
}
