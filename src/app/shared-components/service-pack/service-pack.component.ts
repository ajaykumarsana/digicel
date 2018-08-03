import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService, ServicePack } from 'services';

@Component({
  selector: 'app-service-pack',
  templateUrl: './service-pack.component.html',
  styleUrls: ['./service-pack.component.scss']
})
export class ServicePackComponent implements OnInit {
  @Input() servicePack: ServicePack;
  @Input() selectedServicePack: ServicePack;
  @Output() servicePackSelected = new EventEmitter<ServicePack>();
  @Output() servicePackRemoved = new EventEmitter<ServicePack>();
  public packSelected = false;

  constructor(public cms: CmsService) { }

  ngOnInit() {
    if (this.servicePack === this.selectedServicePack) {
      this.packSelected = true;
    }
  }

  selectServicePack() {
    this.servicePackSelected.emit(this.servicePack);
  }

  removeServicePack() {
    this.servicePackRemoved.emit(this.servicePack);
  }

}
