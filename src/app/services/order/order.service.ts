import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Order } from './order';
import { CmsService } from '../cms';
import { ApiService } from '../api';
import { PortingService } from '../porting';
import { ProspectCustomer, ProspectCustomerService } from '../prospect-customer';
import { TeamService, ProspectTeamMember } from '../team';

@Injectable()
export class OrderService {
  private serviceProviderId: string;
  public acceptTermsAndConditions = false;

  constructor(
    private cms: CmsService,
    private apiService: ApiService,
    private prospectCustomerService: ProspectCustomerService,
    private teamService: TeamService,
    private portingService: PortingService
  ) {
    this.serviceProviderId = this.cms.getEngine();
  }


  // Places an order for new customer
  createOrder(order: Order): Observable<any> {
    const path = `${order.serviceProviderId}/order`;
    const payload = order;

    return this.apiService.call('speed', 'post', path, payload);
  }

  // Determines taxs, fees, etc
  checkOrder(order: Order): Observable<any> {
    const path = `${order.serviceProviderId}/order/check`;
    const payload = order;

    return this.apiService.call('speed', 'post', path, payload);
  }

  // modified to retro fit..this needs to be fully designed cross portal.
  orderSetup(prospectCustomer?: ProspectCustomer, team?: Array<ProspectTeamMember>): Order {
    if (!prospectCustomer) {
      prospectCustomer = this.prospectCustomerService.prospectCustomer;
    }

    if (!team) {
      team = this.teamService.team;
    }

    let order = new Order(prospectCustomer, team, this.serviceProviderId, this.acceptTermsAndConditions);
    let portRequests = this.portingService.getLocalPortRequests('new');
    portRequests.forEach(request => {
      order.portingLines.push(request);
    });

    return order;
  }

  // Creates an order for a customer that is already in the system
  createOrderExistingCustomer(groupId: string, teamMembers: Array<ProspectTeamMember>) {
    const path = `${this.serviceProviderId}/order/${groupId}`;
    teamMembers.forEach(member => {
      member['serviceProviderId'] = this.serviceProviderId;
    });

    return this.apiService.call('speed', 'put', path, teamMembers).map(response => {
      // temp not sure what behavior should be
      return response;
      // need error handling
    });
  }
}
