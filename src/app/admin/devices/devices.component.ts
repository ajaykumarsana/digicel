import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService, Device, CmsService, FormValidationService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  devices: Device[] = [];
  newDevice: Device;
  isAddingDevice = false;
  userPhoneNumber: string;
  maxDevices: number;
  showError = false;
  errorMsg: string;
  newNumberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    public cms: CmsService,
    private formValidationService: FormValidationService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('devices'));
    this.newNumberForm = this.fb.group({
      'number': ['', this.formValidationService.phoneValidator.bind(this.formValidationService)]
    });
  }

  ngOnInit() {
    this.devices = this.userService.devices;
    this.userPhoneNumber = this.userService.user.phoneNumber;
    this.maxDevices = parseInt(this.cms.get('maxBroadWorksAnywhereCount'), 10);
  }

  showAddingField() {
    if (this.devices.length < this.maxDevices) {
      this.newDevice = new Device({});
      this.isAddingDevice = true;
    } else {
      this.setAndShowErrorMsg(this.cms.get('tooManyDevicesError', this.cms.getFromProvider('maxBroadWorksAnywhereCount')));
    }
  }

  setAndShowErrorMsg(errorMsg) {
    this.errorMsg = errorMsg;
    this.showError = true;
    setTimeout(() => this.showError = false, 5000);
  }

  hideAddingField() {
    this.isAddingDevice = false;
    this.newDevice = null;
  }

  addDevice() {
    this.userService.addDevice(this.newDevice.phoneNumber)
      .subscribe(
        devices => {
        this.hideAddingField();
        this.devices = devices;
        },
        error => {
          this.setAndShowErrorMsg(error);
        }
    );
  }

  deleteDevice(device: Device) {
    this.userService.deleteDevice(device)
      .subscribe(devices => {
        this.devices = devices;
      });
  }

  suppressNonDigits(e) {
    const key = e.key;
    if (key.length === 1 && /\D/.test(key)) {
      e.preventDefault();
    }
  }

  setNewNumber(e) {
    this.newDevice.phoneNumber = e;
    this.cd.detectChanges();
  }

}
