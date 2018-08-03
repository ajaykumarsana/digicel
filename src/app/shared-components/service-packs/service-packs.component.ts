import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService, ProspectTeamMember, ServicePack, ServicePackService } from 'services';

@Component({
  selector: 'app-service-packs',
  templateUrl: './service-packs.component.html',
  styleUrls: ['./service-packs.component.scss']
})
export class ServicePacksComponent implements OnInit {
  servicePacks: ServicePack[];
  @Input() popup = true;
  @Input() teamMember: ProspectTeamMember;
  @Input() selectedServicePack: ServicePack;
  @Output() onServicePackSelected = new EventEmitter<ServicePack>();
  @Output() onServicePackRemoved = new EventEmitter<ServicePack>();

  constructor(
    public cms: CmsService,
    private servicePackService: ServicePackService
  ) { }

  ngOnInit() {
    this.servicePackService.getServicePacks().subscribe(servicePacks => {
      this.servicePacks = servicePacks;
    });
  }

  selectServicePack(servicePack: ServicePack) {
    this.onServicePackSelected.emit(servicePack);
  }

  removeServicePack(servicePack: ServicePack) {
    this.onServicePackRemoved.emit(servicePack);
  }
}
