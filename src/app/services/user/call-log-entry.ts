export class CallLogEntry {
  time: Date;
  phoneNumber: string;
  name: string;
  type: 'received' | 'missed' | 'placed';

  constructor(obj: {}, type: 'received' | 'missed' | 'placed') {
    this.time = new Date(obj['time']);
    this.phoneNumber = obj['phoneNumber'];
    this.name = obj['name'];
    this.type = type;
  }

}
