import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { ProspectTeamMember, CmsService, TeamService, CatalogService, Product, Catalog, ServicePack } from 'services';

@Component({
  selector: 'app-team-member-display',
  templateUrl: './team-member-display.component.html',
  styleUrls: ['./team-member-display.component.scss']
})
export class TeamMemberDisplayComponent implements OnInit {
  @Input() teamMember: ProspectTeamMember;
  @Input() deletable: boolean;
  @Input() displayMode: 'price' | 'device';
  @Input() includeDevices: boolean;
  @Input() index: number;
  @Input() showPrice = true;
  @Output() onRemove = new EventEmitter<ProspectTeamMember>();
  @Output() onSelectDevice = new EventEmitter<ProspectTeamMember>();
  @Output() onSelectServicePack = new EventEmitter<ProspectTeamMember>();

  public price: string;
  public isCompany: boolean;
  public products: Product[];
  public showBuy = false;

  constructor(public cms: CmsService, public teamService: TeamService, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.price = this.catalogService.getPrices().standardLine.monthly;
    this.products = this.catalogService.getProducts();

    if ( this.products.length > 0 ) {
      this.showBuy = true;
    }

    if (this.includeDevices) {
      this.price = this.getTotalWithDevice();
    }
  }

  getTotalWithDevice(): string {
      let currencySymbol = '$';
      let device = this.getDevice();
      let devicePrice: number = device ? parseFloat(device.price.replace(currencySymbol, '')) : 0;
      let linePrice: number = parseFloat(this.price.replace(currencySymbol, ''));
      let totalWithDevice: number = devicePrice + linePrice;
      totalWithDevice = Math.round(totalWithDevice * 100) / 100;
      return currencySymbol + totalWithDevice;
  }

  getDevice(): Product {
    return this.teamMember.device;
  }

  getDeviceThumbnail(): string {
    return this.getDevice() && this.getDevice().thumbnail;
  }

  getDeviceName(): string {
    return this.getDevice() && this.getDevice().name;
  }

  getServicePack(): ServicePack {
    return this.teamMember.servicePack;
  }

  getServicePackName(): string {
    return this.getServicePackName() && this.getServicePack().servicePackName;
  }

  removeMember(): void {
    this.teamService.removeTeamMember(this.teamMember);
    this.onRemove.emit(this.teamMember);
  }

  removeDevice(): void {
    this.teamService.removeTeamMemberDevice(this.teamMember);
  }

  selectDevice(): void {
    this.onSelectDevice.emit(this.teamMember);
  }

  removeServicePack(): void {
    this.teamService.removeTeamMemberServicePack(this.teamMember);
  }

  selectServicePack(): void {
    this.onSelectServicePack.emit(this.teamMember);
  }

}
