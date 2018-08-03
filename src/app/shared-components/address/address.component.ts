import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, style } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { STATES, COUNTRIES } from 'services';
import { IAddress } from 'interfaces';
import { ZipCodePipe } from 'pipes';
import { FormValidationService, GroupService, AddressType } from 'services';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
})

/*
 * Address Component
 * @Input addressType: string - either 'shippingAddress', 'billingAddress', or 'serviceAddress'. Defaults to shippingAddress.
 * See address.component.scss for available classes
 */

export class AddressComponent implements OnInit {
    public serviceAddress: IAddress;
    public billingAddress: IAddress;
    public shippingAddress: IAddress;
    public addressesMatch: boolean;
    @Input() addressType: AddressType = 'shippingAddress';
    public addressForm: FormGroup;
    public STATES: string[] = STATES;
    public COUNTRIES: string[] = COUNTRIES;
    public alpha: RegExp = /^[a-zA-Z ]*$/;
    public zip: RegExp = /[0-9 -]/;
    public myZip = new ZipCodePipe();

    constructor(
        private fb: FormBuilder,
        private groupService: GroupService,
        private formValidationService: FormValidationService
    ) {}

    ngOnInit() {
        let fields = {
            'firstName': [null, Validators.compose([
                Validators.required,
                this.formValidationService.nameValidator.bind(this.formValidationService)
            ])],
            'lastName': [null, Validators.compose([
                Validators.required,
                this.formValidationService.nameValidator.bind(this.formValidationService)
            ])],
            'address1': [null, Validators.required],
            'address2': false,
            'city': [null, Validators.required],
            'state': [null, Validators.required],
            'zip': [null, Validators.compose([
                Validators.required,
                this.formValidationService.zipCodeValidator.bind(this.formValidationService)
            ])]
        };

        this.addressForm = this.fb.group(fields);

    }

    /*
     * returns boolean: true if this.billingAddress is the same as this.serviceAddress, else false
     */
    checkAddressesMatch(): boolean {
        let keys = Object.keys(this.serviceAddress);
        for (let key of keys) {
            if (this.serviceAddress[key] !== this.billingAddress[key]) {
                return false;
            }
        }
        return true;
    }

    /*
     * as soon as the user edits the form, assumes this.addressesMatch to be false
     */
    dirtyForm() {
        this.addressesMatch = false;
    }

    /*
     * if this.workingAdddress === this.serviceAddress, clears the form when users toggles the 'same as service address' checkbox
     * else, sets the form to be equal to this.serviceAddress
     */
    checkboxToggle() {
        if (this.addressesMatch) {
            let keys = Object.keys(this.billingAddress);
            for (let key of keys) {
                this.billingAddress[key] = '';
            }
            this.addressForm.patchValue(this.billingAddress);
            this.addressesMatch = false;
        } else {
            this.billingAddress = this.groupService.getAddress('serviceAddress');
            this.addressForm.patchValue(this.billingAddress);
            this.addressesMatch = true;
        }
    }

    // helper function for saving addresses
    setAddress() {
        this.groupService.setAddress(this.addressType, this.billingAddress).subscribe(() => {

        });
    }

    /*
     * user cancels editing address, reset the form to the stored value in groupService
     */
    cancel() {
        this.billingAddress = this.groupService.getAddress(this.addressType);
        this.addressForm.patchValue(this.billingAddress);
    }

    /*
     * user saves address, set the address via the service and optionally check for recommended addresses
     */
    save() {
            this.setAddress();
    }


  }
