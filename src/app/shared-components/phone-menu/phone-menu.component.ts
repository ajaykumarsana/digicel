import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsService, GroupService, TeamMember } from 'services';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HuntGroupService, HuntGroupTable,
         AutoAttendant, AutoAttendantService,
         KeyConfigurationObject, Entry } from 'services';

@Component({
  selector: 'app-phone-menu',
  templateUrl: './phone-menu.component.html',
  styleUrls: ['./phone-menu.component.scss']
})
export class PhoneMenuComponent implements OnInit {
  @Input() title: string;
  @Input() submitButtonText: string;
  @Output() onUpdated: EventEmitter<any>;
  huntGroups: HuntGroupTable;
  teamMembers: TeamMember[];
  menu: KeyConfigurationObject[] = [];
  nonEditableMenuOptions: KeyConfigurationObject[] = [];
  options: Entry[] = [];
  autoAttendant: AutoAttendant;
  setup: FormGroup;
  maxGroups = this.cms.getFromProvider('maxPhoneMenuButtons');

  constructor(
    public cms: CmsService,
    public huntGroupService: HuntGroupService,
    private fb: FormBuilder,
    private autoAttendantService: AutoAttendantService,
    private groupService: GroupService
  ) {
    this.teamMembers = this.groupService.teamMembers;
    this.onUpdated = new EventEmitter();
    this.setup = this.fb.group({
      formArray: this.fb.array([])
    });
  }

  ngOnInit() {
    (<FormArray>this.setup.controls['formArray']).reset();
    this.autoAttendantService.getAutoAttendant()
    .subscribe(autoAttendant => {
      this.autoAttendant = autoAttendant;
      this.createMenu();
      this.createFormGroups();
      this.createTeamMemberOptions();
      this.createAdditionalOptions();
    });
  }

  createMenu() {
    let menu = [];
    let menuOptions = this.autoAttendant.menu;
    for (let [key, control] of Object.entries(menuOptions)) {
      let entry = new Entry({
        'action': menuOptions[key].action,
        'description': menuOptions[key].description,
        'phoneNumber': menuOptions[key].phoneNumber
      });
      let menuOption = new KeyConfigurationObject({ entry: entry, key: key});

      if (key === '*') {
        this.nonEditableMenuOptions.push(menuOption);
      } else {
        this.options.push(entry);
        menu.push(menuOption);
      }
    }

    // sort by name
    menu.sort(function(a, b) {
      let aKey = a.key;
      let bKey = b.key;
      if (aKey < bKey) {
        return -1;
      }
      if (aKey > bKey) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    this.menu = menu;
  }

  createTeamMemberOptions() {
    this.teamMembers.forEach(member => {
      let optionEntry = new Entry({
        'action': 'Transfer Without Prompt',
        'description': member.fullName,
        'phoneNumber': member.extension
      });
      if (!this.optionInMenu(optionEntry.description)) {
        this.options.push(optionEntry);
      }
    });
  }

  createAdditionalOptions() {
    this.huntGroupService.getHuntGroups().subscribe( huntGroups => {
      this.huntGroups = huntGroups;
        for (let i = 0; i < this.huntGroups.huntGroupTable.length; i++) {
          let optionEntry = new Entry({
            'action': 'Transfer Without Prompt',
            'description': this.huntGroups.huntGroupTable[i].huntGroupName,
            'phoneNumber': this.huntGroups.huntGroupTable[i].huntGroup.extension
          });
          if (!this.optionInMenu(optionEntry.description)) {
            this.options.push(optionEntry);
          }
        }
    });
  }

  createFormGroups() {
    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].key !== '*' ) {
        this.addFormGroup(this.menu[i]);
      }
    }
  }

  getMenuKey(index) {
    return this.menu[index].key;
  }

  hasNonEditableMenuOptions() {
    return Boolean(typeof this.nonEditableMenuOptions !== 'undefined' && this.nonEditableMenuOptions.length > 0);
  }

  addFormGroup(value: KeyConfigurationObject) {
    let newGroup = this.fb.group({
      [value.key]: new FormControl(value, Validators.required)
    });
    (<FormArray>this.setup.controls['formArray']).push(newGroup);
  }

  addNewFormGroup() {
    let optionEntry = {
      'action': 'Transfer Without Prompt',
      'description': this.menu[0].entry.description
    };

    let optionKey = this.menu.length.toString();
    let menuOption = new KeyConfigurationObject({
      entry: optionEntry,
      key: optionKey
    });

    this.menu.push(menuOption);
    this.addFormGroup(menuOption);
  }

  optionInMenu(description) {
    let keys = Object.keys(this.autoAttendant.menu);
    for (let key of keys) {
        if (this.autoAttendant.menu[key].description === description) {
            return true;
        }
    }
    return false;
  }

  updateAttendant() {
    let payload = { 'menu': {} };
    for (let i = 0; i < this.menu.length; i++) {
      let menuKey = this.menu[i].key;
      payload.menu[menuKey] = {};
      payload.menu[menuKey]['action'] =
      (<FormArray>this.setup.controls['formArray']).controls[i].value[i].action;
      payload.menu[menuKey]['description'] = (<FormArray>this.setup.controls['formArray']).controls[i].value[i].description;
      if ((<FormArray>this.setup.controls['formArray']).controls[i].value[i].phoneNumber) {
        payload.menu[menuKey]['phoneNumber'] = (<FormArray>this.setup.controls['formArray']).controls[i].value[i].phoneNumber;
      }
    }

    if (this.hasNonEditableMenuOptions()) {
      let menuKey = this.nonEditableMenuOptions[0].key;
      payload.menu[menuKey] = {};
      payload.menu[menuKey]['action'] = this.nonEditableMenuOptions[0].entry.action;
      payload.menu[menuKey]['description'] = this.nonEditableMenuOptions[0].entry.description;
      if (this.nonEditableMenuOptions[0].entry.phoneNumber) {
        payload.menu[menuKey]['phoneNumber'] = this.nonEditableMenuOptions[0].entry.phoneNumber;
      }
    }


    // Creates auto attendant
    this.autoAttendantService.createAutoAttendant(payload).subscribe((response) => {

      // Gets updated auto attendant with new group options
      // (only need this because current service doesn't set up auto attendant singleton on create)
      this.autoAttendantService.getAutoAttendant().subscribe(() => {

        // goes to next step in FTUE
        this.onUpdated.emit();
      });

    });
  }

  submitButtonTextExists(): boolean {
    return Boolean(this.submitButtonText !== undefined);
  }

  delete() {
    this.setup.controls['formArray']['controls'].pop();
    this.menu.pop();

  }

}
