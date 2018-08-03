export class Device {
  phoneNumber: string;
  isActive: boolean;
  description: string;

  constructor(obj: {}) {
    this.phoneNumber = obj['phoneNumber'];
    this.isActive = obj['isActive'] === 'true'; // API returns a string, not boolean
    this.description = obj['description'];
  }
}
