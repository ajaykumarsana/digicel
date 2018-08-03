import { Component, OnInit } from '@angular/core';
import { PostTrialService, UserService, GroupService, Product, CmsService } from 'services';
import { ProspectTeamMember } from 'app/services/team/prospect-team-member';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})


// @TODO Currently there are two different classes representing a team member..one for prospect for buyer and one
// for group for admin.  This is causing issues because the properites are differnet.  THis needs to be unified.
// For now we have hck workarounds, but this is no good long term.
export class DevicesComponent implements OnInit {

  public numbers: Array<any>;

  public deletableMembers: boolean;
  public displayMode: string;
  public teamMemberSelectingDevice: ProspectTeamMember;  // This needs to be unified with Group/Team

  public pageTitle: string;
  public pageDescription: string;
  public pageClass: string;

  constructor(public postTrialService: PostTrialService,
              public user: UserService,
              public team: GroupService,
              public cms: CmsService
  ) {

  }

  ngOnInit() {
    this.getNumbers();
    this.deletableMembers = false;
    this.displayMode = 'device';
  }

  showDevicePopup(teamMember: ProspectTeamMember) {
    this.teamMemberSelectingDevice = teamMember;
  }

  addDevice(device: Product) {
    this.numbers.forEach(member => {
      if (member.id === this.teamMemberSelectingDevice.id) {

        // Temp work around... :()
        member.device = device;
      }
    });
    this.closeCatalog();
  }

  closeCatalog() {
    this.teamMemberSelectingDevice = null;
  }

  // Temp number
  getNumbers() {
    this.numbers = this.postTrialService.getNumbers() || [];
    // console.log(this.user.devices);
    this.numbers.forEach(member => {

      // Temp work around to compensate for the conflicting objects
      // catalog component is expecting a "prospect team member object"
      // eventually we need to streamline this so we just have a single teamMember class for buyer, admin, post trial
      member.teamMember = {
        fullName: member.name,
        phone: member.number,
        id: member.id
      };

      if (!member.device) {
        member.device = {
          name: null,
          price: null
        };
      }
    });
  }

  removeNumber(i) {
    this.numbers.splice(i);
  }

  selectDevice(teamMember: ProspectTeamMember) {
    this.teamMemberSelectingDevice = teamMember;

  }

  saveDevices() {
    this.postTrialService.setNumbers(this.numbers);
  }

}
