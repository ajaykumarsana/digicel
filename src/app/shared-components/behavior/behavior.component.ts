/* tslint:disable:no-access-missing-member */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService, GroupService} from 'services';
import { WizardPage } from '../wizard-page';

export interface BehaviorInterface {
  useModals: boolean;
}

@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.scss']
})
export class BehaviorComponent extends WizardPage implements BehaviorInterface {
  setup: FormGroup;
  behavior: string;
  companyName: string;
  phoneNumber: string;
  useModals: boolean;

  constructor(
    public cms: CmsService,
    private fb: FormBuilder,
    private groupService: GroupService
  ) {
    super();
    this.setup = fb.group({
      behavior: ['', Validators.required]
    });
    this.companyName = groupService.group.groupName;
    this.phoneNumber = groupService.group.phoneNumber;
  }

  finish() {
    this.groupService.setBehavior(this.behavior);
    if (this.behavior === 'voicemail' || this.behavior === 'autoAttendant') {
      let patchInstrument = {
        mainline: {
          'destination' : this.behavior
        }
      };
      this.groupService.updateGroup(patchInstrument).subscribe(
        () => { console.log('group behavior updated'); },
        (err) => console.log(this, err)
      );
    }
    super.finish();
  }

}
