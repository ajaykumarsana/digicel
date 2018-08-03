import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { pull } from 'lodash';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { User } from './user';
import { CallLog } from './call-log';
import { Device } from './device';

@Injectable()
export class UserService {
  // Fetched on login
  public user: User;
  // Fetched on login
  public devices: Device[] = [];
  private serviceProviderId: string;
  public isSimRingSet: boolean;
  public isPasswordExpired: boolean;
  public isUserVMGreetingSet: boolean;


  constructor(private apiService: ApiService, private cms: CmsService) {
    this.serviceProviderId = this.cms.getEngine();
  }

  login(email: string, password: string): Observable<User> {
    return this.apiService.call('speed', 'post', `${this.serviceProviderId}/login`, {
      userName: email,
      password: password,
      serviceProviderId: this.serviceProviderId
    }).map(res => this.user = new User(res));
  }

  getLogin(): Observable<User> {
    return this.apiService.call('speed', 'get', `${this.serviceProviderId}/login`)
      .map(res => this.user = new User(res));
  }

  getUserOrLogin(): Observable<User> {
    if (this.isLoggedIn()) {
      return Observable.of(this.user);
    } else {
      return this.getLogin();
    }
  }

  changePassword(newPassword: string, oldPassword?: string): Observable<any> {
    const body = {
      userName: this.user.userId,
      password: newPassword,
      serviceProviderId: this.serviceProviderId
    };

    if (oldPassword) {
      body['oldPassword'] = oldPassword;
    }

    return this.apiService.call('speed', 'post', `${this.serviceProviderId}/login/password`, body);
  }

  logout(): Observable<any> {
    return this.apiService.call('speed', 'delete', `${this.serviceProviderId}/login`)
      .map(() => {
        this.user = null;
        sessionStorage.clear();
      });
  }

  updateUserVm(vmUrl) {
    this.user.voicemailGreetingUrl = vmUrl;
  }

  getCallLogs(): Observable<CallLog> {
    const phoneNumber = this.user.userIdWithoutDomain;
    const path = `${this.serviceProviderId}/group/${this.user.groupId}/log/${phoneNumber}`;
    return this.apiService.call('speed', 'get', path)
      .map(res => new CallLog(res && res[phoneNumber]));
  }

  getDevices(userId = this.user.userId): Observable<Device[]> {
    const path = `user/${this.serviceProviderId}/${userId}/devices`;
    return this.apiService.call('speed', 'get', path)
      .map(res => this.devices = res['broadworksAnywhere']['devices'].map(d => new Device(d)));
  }

  addDevice(phoneNumber: string): Observable<Device[]> {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const device = {
      phoneNumber: cleanNumber,
      description: `guest ${phoneNumber}`,
      isActive: 'true'
    };

    const path = `user/${this.serviceProviderId}/${this.user.userId}/devices/${cleanNumber}`;
    return this.apiService.call('speed', 'put', path, device).map(() => {
      this.devices.push(new Device(device));
      return this.devices;
    });
  }

  deleteDevice(device: Device): Observable<Device[]> {
    const path = `user/${this.serviceProviderId}/${this.user.userId}/devices/${device.phoneNumber}`;
    return this.apiService.call('speed', 'delete', path).map(() => {
      pull(this.devices, device);
      return this.devices;
    });
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    return this.user.role === 'admin';
  }

  // isUserVMGreetingSet(): boolean {
  //   return !!this.user.voicemailGreetingUrl;
  // }

  // isPasswordExpired(): boolean {
  //   return this.user.passwordExpired;
  // }

  // isSimRingSet(): boolean {
  //   return this.devices.length > 0;
  // }


  getIsSimRingSet(): boolean {
    this.isSimRingSet = !!this.user.voicemailGreetingUrl;
    return this.isSimRingSet;
  }

  getIsPasswordExpired(): boolean {
    this.isPasswordExpired = this.user.passwordExpired;
    return this.isPasswordExpired;
  }

  getIsUserVMGreetingSet(): boolean {
    this.isUserVMGreetingSet = !!this.user.voicemailGreetingUrl;
    return this.isUserVMGreetingSet;
  }

  private setIsSimRingSet(value: boolean) {
    this.isSimRingSet = value;
  }

  private setIsPassWordExpired(value: boolean) {
    this.isPasswordExpired = value;
  }

  private setIsUserVMGreetingSet(value: boolean) {
    this.isUserVMGreetingSet = value;
  }

  bypassModalOptions() {
    this.setIsSimRingSet(true);
    this.setIsPassWordExpired(true);
    this.setIsUserVMGreetingSet(true);
    console.log('calling bypassModalOptions');
  }

}
