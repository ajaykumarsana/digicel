import { Product } from '../catalog';
import { ServicePack } from '../service-packs';

export class ProspectTeamMember {

 public fullName: string;
 public email: string;
 public phone: string;
 public device: Product;
 public id: string;
 public servicePack: ServicePack;

  constructor(object: {}) {
    this.fullName = object['fullName'];
    this.email = object['email'];
    this.phone = object['phone'];
    this.device = object['device'];
    this.id = object['id'] || null;
    this.servicePack = object['servicePack'] || null;
  }

  getInitials(): string {
    let initials = '';
    if (!this.fullName) {
      return initials;
    }

    let names = this.fullName.split(' ');
    for (let i = 0; i < names.length; i++) {
      initials += names[i].substr(0, 1);

      if (i === 1) {
        break;
      }
    }

    return initials;
  }

}
