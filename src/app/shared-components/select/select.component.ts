import { Component, OnInit, Input } from '@angular/core';
import { CmsService, Entry } from 'services';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss']
})

/*
 * Class SelectComponent
 * @Input control: FormControl - the individual form control object that represents this select
 * @Input items: SelectItem[] - a list of options for the select
 * @Input name: string - the name value of the select input
 * @Input value: string - the default value for the select before user interaction. Defaults to 'Select'
 */
export class SelectComponent implements OnInit {
    @Input() formGroup: FormGroup;
    control: AbstractControl;
    @Input() items: Entry[];
    @Input() name: string;
    public isOpen = false;
    public searchResult: Entry;

    constructor(public cms: CmsService) {
    }

    ngOnInit() {
      this.control = this.formGroup.controls[this.name];
      this.itemSelected(this.items[this.name]);
      // this.itemSelected(this.items[this.name].entry || this.items[0]);
    }

    /*
     * this updates the input and fires an event when the select is updated
     */
    itemSelected(item: Entry, remainOpen?: boolean) {
        this.control.setValue(item);
        this.isOpen = Boolean(remainOpen);
    }

    /* Key Press Event Handler for State Box */
    stateBoxOpenEventHandler(e) {
        // Skip if no items or user presses Tab
        if (!this.items || e.which === 9) {
            return;
        }
        this.isOpen = true;
        // Up arrow
        if (e.which === 38) {
            e.preventDefault();
            this.selectPreviousItem();
            document.querySelector('ul.dropdown-menu').scrollTop -= 28;
            // Down arrow
        } else if (e.which === 40) {
            e.preventDefault();
            this.selectNextItem();
            document.querySelector('ul.dropdown-menu').scrollTop += 28;
        } else {
            this.searchResult = this.items.find(v => {
                return v.description.startsWith(e.key.toUpperCase());
            });
            if (this.searchResult) {
                this.itemSelected(this.searchResult);
            }
        }
    }

    selectNextItem() {
        let currentItemIndex: number = this.items.findIndex(item => item === this.control.value);
        // If no item selected, then select first item
        if (currentItemIndex === -1) {
            this.itemSelected(this.items[0], true);
            // If last item selected, do nothing
        } else if (currentItemIndex === this.items.length - 1) {
            return;
            // Otherwise, select next item
        } else {
            this.itemSelected(this.items[currentItemIndex + 1], true);
        }
    }

    selectPreviousItem() {
        let currentItemIndex: number = this.items.findIndex(item => item === this.control.value);
        // If no item selected or first item selected, then do nothing
        if (currentItemIndex <= 0) {
            return;
            // Otherwise, select previous item
        } else {
            this.itemSelected(this.items[currentItemIndex - 1], true);
        }
    }
}

