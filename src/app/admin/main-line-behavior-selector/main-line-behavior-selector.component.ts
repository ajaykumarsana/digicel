import { Component, OnInit} from '@angular/core';
import { MainLineOption } from './mainLineOption';
import { CmsService, GroupService, Group, AutoAttendantService,
         AutoAttendant, KeyConfigurationObject, FormValidationService, TeamMember,
         HuntGroupService, HuntGroupTable, AdminService } from 'services';
import { FormBuilder, FormsModule, Validators, FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FtueComponent } from '../ftue/ftue.component';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'app-main-line-behavior-selector',
    templateUrl: './main-line-behavior-selector.component.html',
    styleUrls: ['./main-line-behavior-selector.component.scss']
})

export class MainLineBehaiviorSelectorComponent implements OnInit {
  group: Group;
  behavior: string;
  selectedOption: MainLineOption;
  mainLineOptions: MainLineOption[];
  teamMembers: TeamMember[] = [];
  setup: FormGroup;
  huntGroups: HuntGroupTable;
  receptionist: TeamMember;
  autoAttendant: AutoAttendant;
  companyName: string;
  companyNumber: string;
  voicemailLabel: string;
  automatedReceptionistLabel: string;
  companyVoicemailLabel: string;
  aaMenuConfiguration: {}[];
  subscription: Subscription;
  menu: KeyConfigurationObject[];

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private autoAttendantService: AutoAttendantService,
    public huntGroupService: HuntGroupService,
    public adminService: AdminService,
    public ftueComponent: FtueComponent
  ) {
      this.group = this.groupService.group;
      this.behavior = this.group.behavior;
      if (this.behavior === 'receptionist') {
        this.setReceptionistText(this.group.mainLine.receptionistUser);
        this.behavior = this.group.mainLine.receptionistUser;
      }
      this.companyName = this.groupService.group.groupName;
      this.companyNumber = this.groupService.group.phoneNumber;
      this.teamMembers = this.groupService.teamMembers;
      this.autoAttendant = this.autoAttendantService.autoAttendant;
      this.huntGroups = this.huntGroupService.huntGroupTable;
      this.setup = fb.group({
        behavior: ['', Validators.required]
      });
      this.voicemailLabel = this.cms.get('voicemail');
      this.automatedReceptionistLabel = this.cms.get('company-auto-attendant-header');
      this.companyVoicemailLabel = this.cms.get('companyVoicemail');
    }

    ngOnInit() {
      this.getMenuAndOptions();
    }

    getMenuAndOptions() {
      this.subscription = this.autoAttendantService.getAutoAttendant().subscribe(autoAttendandt => {
        this.menu = autoAttendandt.menu;
        this.setMainLineOptions();
        this.generateAAListing();
      });
    }

    generateAAListing() {
      this.aaMenuConfiguration = [];
      let zeroOption = [];
      let asteriskOption = [];
      let menu = this.autoAttendantService.autoAttendant.menu;
      for (let [key, control] of Object.entries(menu)) {
        let htmlID = menu[key].description.replace(/\s+/g, '').toLowerCase();
        let members = this.getMembers(htmlID);
        let hasMembers = false;

        if (members.length > 0) {
           hasMembers = true;
        }

        if (key === '0') {
          zeroOption.push(
            {
              number: key.toLocaleLowerCase(),
              name: menu[key].description,
              id: htmlID,
              hasMembers: hasMembers,
              members: members});
        } else if (key === '*') {
          asteriskOption.push(
            {
              number: key.toLocaleLowerCase(),
              name: menu[key].description,
              id: htmlID,
              hasMembers: hasMembers,
              members: members});
        } else {
          this.aaMenuConfiguration.push(
            {
              number: key.toLocaleLowerCase(),
              name: menu[key].description,
              id: htmlID,
              hasMembers: hasMembers,
              members: members});
        }
      }
      if (zeroOption.length > 0) {
        this.aaMenuConfiguration.push(zeroOption[0]);
      }
      if (asteriskOption.length > 0) {
        this.aaMenuConfiguration.push(asteriskOption[0]);
      }
    }

    getMembers(huntGroupName) {
      let members = [];
      let hgTable = this.huntGroups.huntGroupTable;
      for (let [key, control] of Object.entries(hgTable)) {
        let hgName = hgTable[key].huntGroupName.replace(/\s+/g, '').toLowerCase();
        if (hgName === huntGroupName) {
          members = hgTable[key].huntGroup.members;
         }
      }
      return members;
    }

    getHuntGroupMembers() {
      let hgTable = this.huntGroups.huntGroupTable;
      for (let [key, control] of Object.entries(hgTable)) {
        let hgID = hgTable[key].huntGroupName.replace(/\s+/g, '').toLowerCase();
        let hgMembers = hgTable[key].huntGroup.members;
      }
    }

    setMainLineOptions() {
      let options = [
        new MainLineOption(1, this.companyVoicemailLabel, 'voicemail'),
        new MainLineOption(2, this.automatedReceptionistLabel, 'autoAttendant')
      ];

      this.teamMembers.forEach((teamMember, index) => {
        let member = new MainLineOption(3 + index, teamMember.fullName, teamMember.extension);
        options.push(member);
      });
      this.mainLineOptions = options;
    }

    setReceptionistText(extension) {
      let receptionist = this.groupService.getMemberByExtension(extension);
      this.receptionist = receptionist;
    }

    onSelect(value) {
      if (value === 'voicemail' || value === 'autoAttendant') {
        this.groupService.setBehavior(value);
        let patchInstrument = {
          mainline: {
            'destination' : this.behavior
          }
        };
        this.groupService.updateGroup(patchInstrument).subscribe(
          () => { console.log('group behavior updated'); },
          (err) => console.log(this, err)
        );
      } else {
        this.setReceptionistText(value);
        let receptionist = 'receptionist';
        this.groupService.setBehavior(receptionist);
        let patchInstrument = {
          mainline: {
            'destination' : receptionist,
            'phoneNumber' : value
          }
        };
        this.groupService.updateGroup(patchInstrument).subscribe(
          () => { console.log('group behavior updated'); },
          (err) => console.log(this, err)
        );
      }
    }

    getBehavior() {
      return this.behavior;
    }

    configureAutoAttendant() {
      this.groupService.resetAutoAttendantOptions();
      this.ftueComponent.runModalChecks();
      this.adminService.showFTUE = true;
      this.ftueComponent.spliceInBehaviorSpecificModals();
    }
}
