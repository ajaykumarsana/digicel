import { Component, OnInit } from '@angular/core';
import { CmsService, GroupService, Group, AutoAttendantService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss']
})
export class ReceptionistComponent implements OnInit {
  group: Group;
  companyName: string;
  companyNumber: string;
  behavior: 'autoAttendant' | 'receptionist' | 'voicemail';

  constructor(
    public cms: CmsService,
    private groupService: GroupService,
    private autoAttendantService: AutoAttendantService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('autoAttendant'));
    this.group = this.groupService.group;
    this.behavior = this.group.behavior;
    this.companyName = this.groupService.group.groupName;
    this.companyNumber = this.groupService.group.phoneNumber;
  }

  ngOnInit() {}

  isAutoAttendantSet(): boolean {
    return !! this.groupService.isAutoAttendantSet;
  }

  getBehavior() {
    return this.behavior;
  }

  setBehavior() {

  }

}
