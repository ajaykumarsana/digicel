import { Component, OnInit } from '@angular/core';
import { CmsService, TeamService } from 'services';
import { ProspectCustomerService, ProspectTeamMember, ProspectCustomer, PortingService } from 'services';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-checkout',
  templateUrl: './post-checkout.component.html',
  styleUrls: ['./post-checkout.component.scss']
})
export class PostCheckoutComponent implements OnInit {

  public pageTitle: string;
  public pageDescription: string;
  public pageClass: string;

  public teamMembers: ProspectTeamMember[];
  public prospectCustomer: ProspectCustomer;
  public teamSize: number;

  public deletableMembers: boolean;
  public displayMode: string;
  public teamMembersLabel: string;

  public pendingPorts: boolean;
  public total: number;

  constructor(
    private router: Router,
    private teamService: TeamService,
    public cms: CmsService,
    private prospectCustomerService: ProspectCustomerService,
    private portingService: PortingService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.cms.get('summarySetupTitle'));
    this.pendingPorts = Boolean(this.portingService.portRequests.find(port => {
      return !port.complete;
    }));
  }

  ngOnInit() {

    // Sign up Nav Header
    this.pageTitle = this.cms.get('summarySetupTitle');
    this.pageDescription = this.cms.get('summarySetupDescription');
    this.pageClass = this.pageClass = 'summary';
    this.prospectCustomer = this.prospectCustomerService.prospectCustomer;

    // Company Component

    // Team Component
    this.teamMembers = this.teamService.team;
    this.teamSize = this.teamMembers.length;
    this.deletableMembers = false;
    this.displayMode = 'price';
    this.teamMembersLabel = this.cms.get('formLabels.teamMembers');

    // todo: this won't work until we are able to get the groupId. How do we do that?
    /*this.portingService.createPortRequests(this.portingService.getLocalPortRequests()).subscribe(response => {
      console.log(response);
    });*/

    this.calculateTotal();

  }

  calculateTotal(): void {
    let linePrice: number = Number(this.cms.getFromProvider('linePrice'));
    let monthlyPrice: number = Number(this.cms.getFromProvider('monthlyPrice'));
    this.total = monthlyPrice + (linePrice * this.teamSize);
  }

  launchOnBoarding() {
    const currentUrl = window.location.href;
    if (this.router.url.indexOf('/buyer/') !== -1) {
      const adminUrl = currentUrl.replace('buyer/sign-up/post-checkout', 'admin');
      window.open(adminUrl, '_blank');
    } else {
      const onboardingUrl = currentUrl.replace('provisioning/sign-up/post-checkout', 'onboarding');
      window.open(onboardingUrl, '_blank');
    }
  }

  launchPorting() {
    if (this.prospectCustomerService.prospectCustomer.portingPhoneNumber) {
      if (this.router.url.indexOf('/buyer/') !== -1) {
        this.router.navigate(['/buyer/porting/phone-number']);
      } else {
        this.router.navigate(['/provisioning/porting/phone-number']);
      }
    } else {
      if (this.router.url.indexOf('/buyer/') !== -1) {
        this.router.navigate(['/buyer/porting/team']);
      } else {
        this.router.navigate(['/provisioning/porting/team']);
      }
    }
  }

}
