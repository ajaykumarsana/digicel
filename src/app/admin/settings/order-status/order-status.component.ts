import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CmsService, GroupService, OrderStatus } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  orderStatuses: OrderStatus[] = [];
  orderStatusSubscription: Subscription;
  pollingInterval = 10000; // 10 seconds

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('orderStatus'));
   }

  ngOnInit() {
    this.orderStatusSubscription = Observable.timer(0, this.pollingInterval)
      .flatMap(() => this.groupService.getOrderStatuses())
      .subscribe(orderStatuses => {
        this.orderStatuses = orderStatuses;
      });
  }

  ngOnDestroy() {
    this.orderStatusSubscription.unsubscribe();
  }

  getAlertTypeClass(status: OrderStatus): string {
    switch (status.category) {
      case 'info': return 'alert-info';
      case 'warning': return 'alert-warning';
      case 'error': return 'alert-danger';
      case 'success': return 'alert-success';
      default: return 'alert-info';
    }
  }

}
