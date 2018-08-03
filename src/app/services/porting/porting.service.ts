import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { GroupService } from '../group';
import { Port } from './port';


@Injectable()
export class PortingService {
  public serviceProviderId;
  public groupId;
  public portRequests: Array<Port>;
  // public portingNumber:
  constructor(
    public apiService: ApiService,
    public cms: CmsService,
    public groupService: GroupService
  ) {
    this.serviceProviderId = this.cms.getEngine();

    const portRequestsFromSession = JSON.parse(sessionStorage.getItem('port-requests'));

    if (portRequestsFromSession) {
      this.portRequests = portRequestsFromSession.map(request => new Port(request));
    } else {
      this.portRequests = [];
    }
  }

  setGroupId() {
    this.groupId = this.groupId || this.groupService.group.groupId;
  }

  addLocalPortRequests(port: Port) {
    if (this.portRequestExists(port.temporaryPhoneNumber) || this.portRequestExists(port.portingPhoneNumber)) {
      let oldPort = this.portRequests.find(request => {
        return request.portingPhoneNumber === port.portingPhoneNumber;
      });
      if (oldPort.complete) {
        return false;
      } else {
        this.removeLocalPortRequestByPortingNumber(port.portingPhoneNumber);
        this.portRequests.push(port);
      }
    } else {
      this.portRequests.push(port);
      this.cache();
    }
  }

  removeLocalPortRequestByTempNumber(temporaryNumber: string) {
    for (let i = 0; i < this.portRequests.length; i++) {
      let port = this.portRequests[i];
      if (port.temporaryPhoneNumber === temporaryNumber) {
        this.portRequests.splice(i, 1);
        this.cache();
        return true;
      }
    }
    return false;
  }

  removeLocalPortRequestByPortingNumber(portingPhoneNumber: string) {
    for (let i = 0; i < this.portRequests.length; i++) {
      let port = this.portRequests[i];
      if (port.portingPhoneNumber === portingPhoneNumber) {
        this.portRequests.splice(i, 1);
        this.cache();
        return true;
      }
    }
    return false;
  }

  assignTemporaryNumber(temporaryNumber: string, portingPhoneNumber: string): boolean {
    let port = this.portRequests.find(portRequest => {
      return portRequest.portingPhoneNumber === portingPhoneNumber;
    });
    if (port) {
      this.removeLocalPortRequestByPortingNumber(portingPhoneNumber);
      port.temporaryPhoneNumber = temporaryNumber;
      this.addLocalPortRequests(port);
      console.log(this.portRequests);
      return true;
    }
    return false;
  }

  getPortRequestNumberByTempNumber(temporaryNumber: string): string {
    for (let i = 0; i < this.portRequests.length; i++) {
      let portObj = this.portRequests[i];
      if (portObj.temporaryPhoneNumber === temporaryNumber) {
        return portObj.portingPhoneNumber;
      }
    }

    return undefined;
  }

  portRequestExists(phoneNumber) {
    for (let i = 0; i < this.portRequests.length; i++) {
      let portObj = this.portRequests[i];
      if (portObj.temporaryPhoneNumber === phoneNumber || portObj.portingPhoneNumber === phoneNumber) {
        return true;
      }
    }
    return false;

  }

  getLocalPortRequests(status?: string) {
    if (!this.portRequests) {
      let local = JSON.parse(sessionStorage.getItem('port-requests'));
      this.portRequests = local.map(request => new Port(request));
    }
    if (status) {
      let filteredPorts = [];
      this.portRequests.forEach(port => {
        if (port.status === status) {
          filteredPorts.push(port);
        }
      });
      return filteredPorts;

    } else {
      return this.portRequests;
    }
  }

  cache(): void {
    sessionStorage.setItem('port-requests', JSON.stringify(this.portRequests));
  }

  getInProgressPorts(): Observable<Port> {
    this.setGroupId();
    const path = `${this.serviceProviderId}/group/${this.groupId}/porting/`;
    return this.apiService.call('speed', 'get', path).map(ports => {
      return ports.portingLines.map(port => {
        this.addLocalPortRequests(new Port({
          'temporaryPhoneNumber': port.temporaryPhoneNumber,
          'portingPhoneNumber': port.portingPhoneNumber,
          'billingTelephoneNumber': port.billingTelephoneNumber,
          'businessName': port.businessName,
          'accountAddress': port.accountAddress,
          'authorizingName': port.authorizingName,
          'accountNumber': port.accountNumber,
          'accountPIN': port.accountPIN,
          'status': 'in progress'
        }));
      });
    });
  }

  deleteInProgressPort(temporaryPhoneNumber: string) {
    this.setGroupId();
    const path = `${this.serviceProviderId}/group/${this.groupId}/porting/${temporaryPhoneNumber}`;
    return this.apiService.call('speed', 'delete', path).map(response => {
      // if successful (need if successful condition)
      this.removeLocalPortRequestByTempNumber(response.temporaryPhoneNumber);
      return response; // todo: map to just status?
    });
  }

  createPortRequests(portRequests: Array<Port>) {
    this.setGroupId();
    const path = `${this.serviceProviderId}/group/${this.groupId}/porting`;
    const payload = {
      'portingLines': []
    };
    portRequests.forEach(portObj => {
      let formattedObj = this.formatPortObjectForCreate(portObj);
      payload.portingLines.push(formattedObj);
    });

    return this.apiService.call('speed', 'post', path, payload).map(response => {
        console.log(response);
        return response;
    });
  }

  formatPortObjectForCreate(port: Port) {
    return {
      'temporaryPhoneNumber': port.temporaryPhoneNumber,
      'portingPhoneNumber': port.portingPhoneNumber,
      'billingTelephoneNumber': port.billingTelephoneNumber,
      'businessName': port.businessName,
      'accountAddress': port.accountAddress,
      'authorizingName': port.authorizingName,
      'accountNumber': port.accountNumber,
      'accountPIN': port.accountPIN,
      'complete': port.complete
    };
}

}
