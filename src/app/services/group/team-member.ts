import { Product } from 'services';

export class TeamMember {
  emailAddress: string;
  firstName: string;
  lastName: string;
  number: string;
  IMPId: string;
  userId: string;
  extension: string;
  role: 'user' | 'admin' | 'system';
  device: Product;

  constructor(obj: {}) {
    this.emailAddress = obj['emailAddress'];
    this.firstName = obj['firstName'];
    this.lastName = obj['lastName'];
    this.number = obj['number'] || obj['phoneNumber'];
    this.IMPId = obj['IMPId'] || obj['impId'];
    this.userId = obj['userId'] || this.number;
    this.extension = obj['extension'];
    this.role = obj['role'] || obj['addressLocation'];
    this.device = obj['device'];
  }

  get fullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  get initials(): string {
    return this.firstName.substr(0, 1) + this.lastName.substr(0, 1);
  }
}
