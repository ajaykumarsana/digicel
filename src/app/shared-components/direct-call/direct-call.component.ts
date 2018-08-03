/* tslint:disable:no-access-missing-member */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService, Group, GroupService, TeamMember } from 'services';
import { WizardPage } from '../wizard-page';

export interface DirectCallInterface {
  useModals: boolean;
}

@Component({
  selector: 'app-direct-call',
  templateUrl: './direct-call.component.html',
  styleUrls: ['./direct-call.component.scss']
})
export class DirectCallComponent extends WizardPage implements DirectCallInterface {
  setup: FormGroup;
  selectedMember: string;
  team: TeamMember[];
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private fb: FormBuilder,
    private groupService: GroupService
  ) {
    super();
    this.team = this.groupService.teamMembers;
    this.setup = fb.group({
      selectedMember: ['', Validators.required]
    });
  }

  finish() {
    let phoneNumber = this.selectedMember.substr(this.selectedMember.length - 4);
    let receptionist  = 'receptionist';
    this.groupService.setBehavior(receptionist);
    let patchInstrument = {
      mainline: {
        'destination' : receptionist,
        'phoneNumber' : phoneNumber
      }
    };
    this.groupService.updateGroup(patchInstrument).subscribe(
      () => { console.log('group behavior updated'); },
      (err) => console.log(this, err)
    );
    super.finish();
  }

}
