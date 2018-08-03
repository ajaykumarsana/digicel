import * as moment from 'moment';

export class OrderStatus {
  type: 'order' | 'porting' | 'trial';
  category: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  orderNumber: string;
  orderDate: Date;

  // ORDER only
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'error';
  orderTotal: number;
  trackingNumber: string;
  shipDate: Date; // estimated if pending
  deliveryDate: Date; // estimated if not yet delivered

  // PORTING only
  portingStatus: 'notStarted' | 'pending' | 'cancelled' | 'completed' | 'error';
  portNumber: string; // telephone #
  firmOrderCommitDate: Date;

  constructor(res: {}) {
    this.type = res['type'];
    this.category = res['category'];
    this.title = res['title'];
    this.message = res['message'];
    this.orderNumber = res['orderNumber'];
    this.orderDate = moment(res['orderDate']).toDate();

    if (this.type === 'order') {
      this.orderStatus = res['orderStatus'];
      this.orderTotal = res['orderTotal'];
      this.trackingNumber = res['trackingNumber'];
      this.shipDate = moment(res['shipDate']).toDate();
      this.deliveryDate = moment(res['deliveryDate']).toDate();
    } else if (this.type === 'porting') {
      this.portingStatus = res['portingStatus'];
      this.portNumber = res['portNumber'];
      this.firmOrderCommitDate = moment(res['firmOrderCommitDate']).toDate();
    }
  }
}
