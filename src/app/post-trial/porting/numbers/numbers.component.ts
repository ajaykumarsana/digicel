import { Component, OnInit } from '@angular/core';
import { CmsService, PostTrialService, UserService, GroupService, TeamMember } from 'services';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss']
})
export class NumbersComponent implements OnInit {

  // @todo: right now all dummy data
  public numbers: Array<any>;
  public users: Array<any>;
  public team: TeamMember[];
  teamMemberSelectingDevice: any;

  constructor(
    public cms: CmsService,
    public user: UserService,
    public teamService: GroupService,
    private postTrialService: PostTrialService
  ) {

    this.team = this.teamService.teamMembers;
    console.log(this.user.user);
  }

  ngOnInit() {
    this.initNumbers();
  }

  initNumbers() {
   let team = this.teamService.teamMembers;
   this.numbers = [];
    team.forEach(member => {
      this.numbers.push({
        name: member.firstName + ' ' + member.lastName,
        number: member.number,
        id: member.IMPId
      });
    });
  }

  addNumber() {
    this.numbers.push({
      name: null,
      id: null,
      number: null
    });
  }

  removeNumber(i) {
    // remove number
    this.numbers.splice(i);
  }


  saveNumbers() {
    this.postTrialService.setNumbers(this.numbers);

  }

  addDevice(data) {
    console.log('addDevice');
  }

  closeCatalog() {
    console.log('closeCatalog');
  }

}
