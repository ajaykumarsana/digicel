import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, ProspectTeamMember, GroupService, TeamMember, CmsService, ProspectCustomer,
         SignUpFlowService, ProvisioningFlowService} from 'services';
import { TeamService, PhoneNumbersService, ProspectCustomerService, PortingService } from 'services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  // @note: team member and prospect team member slightly different, but both needed until we combine
  public teamMembers: Array<any>;
  public GLUE: boolean;
  public portingFlow: boolean;
  public buyer: boolean;
  public existingTeamMembers: Array<any>;
  public linePrice: string;
  public lineLimit: string;
  public areaCode: string;

  constructor(
    public user: UserService,
    public router: Router,
    private aRoute: ActivatedRoute,
    public group: GroupService,
    public cms: CmsService,
    public teamService: TeamService,
    private phoneService: PhoneNumbersService,
    private porting: PortingService,
    private suf: SignUpFlowService,
    private pfs: ProvisioningFlowService,
    public prospectCustomerService: ProspectCustomerService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('teamSetupTitle'));
    this.GLUE = aRoute.snapshot.data.GLUE;
    this.buyer = aRoute.snapshot.data.buyer;
    this.portingFlow = !aRoute.snapshot.data.noPort;
    this.lineLimit = this.cms.getFromProvider('maxUsers');
    if (this.GLUE) {
      this.areaCode = this.group.getAreaCode();
      this.phoneService.generatePhoneNumbers(this.areaCode, Number(this.lineLimit)).subscribe(response => {
      });
    }
  }

  ngOnInit() {
    this.linePrice = this.cms.getFromProvider('linePrice');
    this.teamMembers = this.teamService.team;
    this.existingTeamMembers = [];
    if (this.GLUE) {
      this.existingTeamMembers = this.teamService.existingTeam;
    }

    // Because Prospect and Team Member are slightly different, need to translation
    // Going through existing team members, setting them up on team page
    if (this.GLUE && this.existingTeamMembers.length === 0) {
      this.group.teamMembers.forEach(member => {
        this.teamService.addExistingTeamMember(new ProspectTeamMember({
          fullName: member.fullName,
          device: member.device,
          id: member.IMPId,
          email: member.emailAddress,
          phone: member.number
        }));
      });
    }
  }

  // Add new empty member to team array
  addMember() {
    this.teamService.addTeamMemberByObject(new ProspectTeamMember({
      fullName: null,
      email: null,
      device: null,
      id: null,
      phone: null
    }));
  }

  disableNextButton(): boolean {
    let incomplete = false;
    this.teamMembers.forEach(member => {
      if (this.teamService.isIncomplete(member)) {
        incomplete = true;
        return;
      }
    });
    return this.teamMembers.length + this.existingTeamMembers.length < 1 || incomplete;
  }

  disableAddButton(): boolean {
    return parseInt(this.lineLimit, 10) <= this.teamService.team.length + this.teamService.existingTeam.length;
  }

  // Remove member at index i from team array
  removeMember(member) {
    this.teamService.removeTeamMember(member);
  }

  // Go to checkout page
  nextPage() {
    if (this.GLUE) {
      this.router.navigate(['group-level/checkout']);
    } else if (this.portingFlow) {
      this.router.navigate(['/buyer/sign-up/summary']);
    } else {
      if (this.buyer) {
        this.router.navigate([this.suf.getNextStep()]);
      } else {
        this.router.navigate([this.pfs.getNextStep()]);
      }
    }
    // });
  }

  // GLUE goes back to admin page for now I guess
  previousPage() {
    if (this.GLUE) {
      this.router.navigate(['admin']);
    } else if (this.portingFlow) {
      this.router.navigate(['/buyer/porting/phone-number']);
    } else {
      if (this.buyer) {
        this.router.navigate([this.suf.getPreviousStep()]);
      } else {
        this.router.navigate([this.pfs.getPreviousStep()]);
      }
    }
  }

}
