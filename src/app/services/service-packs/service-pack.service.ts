import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { ServicePack } from './service-pack';
import { EnterpiseLevelAddOns } from './enterprise-level-add_ons';
import { UserLevelAddOns } from './user-level-add_ons';
import { UserLevelCollabFeatures } from './user-level-collab-features';
import { UserLevelVoiceFatures } from './user-level-voice-features';



@Injectable()
export class ServicePackService {
  serviceProviderId: string;
  servicePacks: ServicePack[];



  constructor(private apiService: ApiService, private cms: CmsService) {
    this.serviceProviderId = this.cms.getEngine();
    this.servicePacks = JSON.parse(sessionStorage.getItem('servicePacks'));
  }
  getServicePacks(): Observable<ServicePack[]> {

    if (this.servicePacks && this.servicePacks.length > 0) {
      return Observable.of(this.servicePacks);
    } else {
      // temp fix using static generation
      return this.createStaticServicePacks();
      // const path = `${this.serviceProviderId}/order/servicepack`;
      // return this.apiService.call('speed', 'get', path)
      //   .map(servicePacks => {
      //     sessionStorage.setItem('servicePacks', JSON.stringify(servicePacks));
      //     return this.servicePacks = servicePacks;
      //   });
    }
  }

  createStaticServicePacks(): Observable<ServicePack[]> {
    let staticServicePacks = [];
    let servicePack1 = new ServicePack({
      servicePackId: 'servicePack1',
      servicePackName: 'Basic Enterprise',
      enterpiseLevelAddOns: new EnterpiseLevelAddOns ({
        autoAttendant: 'optional',
        huntGroups: true,
        callParkAndPickUp: false,
        onHoldMessaging: false
      }),
      userLevelAddOns: new UserLevelAddOns({
        onlinePortalForEndUser: false,
        mobileTabletPCApp: false,
        multipleDevicesPerUser: false
      }),
      userLevelCollabFeatures: new UserLevelCollabFeatures({
        instantMessaging: false,
        presence: false,
        myRoom: false,
        desktopSharing: false,
        callPull: false,
        videoConferencing: false,
        multiConference: '3Way',
        meetmeConference: false
      }),
      userLevelVoiceFatures: new UserLevelVoiceFatures({
        doNotDisturb: false,
        callWaiting: true,
        callForwardingConditional: 'no_answer',
        callTransfer: true,
        anonymousCallRejection: false,
        callForwardWithSchedule: false,
        busyLampField: false,
        customRingback: false,
        selectiveCallAcceptanceRejection: false
      }),
      products: null,
      price: {
        monthly: '9.99',
        setup: '9.99'
      }
    });
    let servicePack2 = new ServicePack({
      servicePackId: 'servicePack2',
      servicePackName: 'Standard Enterprise',
      enterpiseLevelAddOns: new EnterpiseLevelAddOns ({
        autoAttendant: 'optional',
        huntGroups: true,
        callParkAndPickUp: true,
        onHoldMessaging: false
      }),
      userLevelAddOns: new UserLevelAddOns({
        onlinePortalForEndUser: false,
        mobileTabletPCApp: false,
        multipleDevicesPerUser: false
      }),
      userLevelCollabFeatures: new UserLevelCollabFeatures({
        instantMessaging: false,
        presence: false,
        myRoom: false,
        desktopSharing: false,
        callPull: false,
        videoConferencing: false,
        multiConference: '3Way',
        meetmeConference: false
      }),
      userLevelVoiceFatures: new UserLevelVoiceFatures({
        doNotDisturb: true,
        callWaiting: true,
        callForwardingConditional: 'no_answer',
        callTransfer: true,
        anonymousCallRejection: true,
        callForwardWithSchedule: false,
        busyLampField: false,
        customRingback: false,
        selectiveCallAcceptanceRejection: false
      }),
      products: null,
      price: {
        monthly: '19.99',
        setup: '9.99'
      }
    });
    let servicePack3 = new ServicePack({
      servicePackId: 'servicePack3',
      servicePackName: 'Premium Enterprise',
      enterpiseLevelAddOns: new EnterpiseLevelAddOns ({
        autoAttendant: 'optional',
        huntGroups: true,
        callParkAndPickUp: true,
        onHoldMessaging: true
      }),
      userLevelAddOns: new UserLevelAddOns({
        onlinePortalForEndUser: false,
        mobileTabletPCApp: false,
        multipleDevicesPerUser: true
      }),
      userLevelCollabFeatures: new UserLevelCollabFeatures({
        instantMessaging: false,
        presence: false,
        myRoom: false,
        desktopSharing: false,
        callPull: true,
        videoConferencing: false,
        multiConference: 'NWay',
        meetmeConference: false
      }),
      userLevelVoiceFatures: new UserLevelVoiceFatures({
        doNotDisturb: true,
        callWaiting: true,
        callForwardingConditional: 'no_answer',
        callTransfer: true,
        anonymousCallRejection: true,
        callForwardWithSchedule: false,
        busyLampField: true,
        customRingback: true,
        selectiveCallAcceptanceRejection: true
      }),
      products: null,
      price: {
        monthly: '29.99',
        setup: '9.99'
      }
    });
    let servicePack4 = new ServicePack({
      servicePackId: 'servicePack4',
      servicePackName: 'UC One Complete',
      enterpiseLevelAddOns: new EnterpiseLevelAddOns ({
        autoAttendant: 'optional',
        huntGroups: true,
        callParkAndPickUp: true,
        onHoldMessaging: true
      }),
      userLevelAddOns: new UserLevelAddOns({
        onlinePortalForEndUser: false,
        mobileTabletPCApp: true,
        multipleDevicesPerUser: true
      }),
      userLevelCollabFeatures: new UserLevelCollabFeatures({
        instantMessaging: true,
        presence: true,
        myRoom: true,
        desktopSharing: true,
        callPull: true,
        videoConferencing: true,
        multiConference: 'NWay',
        meetmeConference: true
      }),
      userLevelVoiceFatures: new UserLevelVoiceFatures({
        doNotDisturb: true,
        callWaiting: true,
        callForwardingConditional: 'no_answer',
        callTransfer: true,
        anonymousCallRejection: true,
        callForwardWithSchedule: true,
        busyLampField: true,
        customRingback: true,
        selectiveCallAcceptanceRejection: true
      }),
      products: null,
      price: {
        monthly: '39.99',
        setup: '9.99'
      }
    });

    staticServicePacks.push(servicePack1);
    staticServicePacks.push(servicePack2);
    staticServicePacks.push(servicePack3);
    staticServicePacks.push(servicePack4);

    this.servicePacks = staticServicePacks;


    sessionStorage.setItem('servicePacks', JSON.stringify(this.servicePacks));
    return Observable.of(this.servicePacks);
  }

}
