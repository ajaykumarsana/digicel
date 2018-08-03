import { Injectable } from '@angular/core';
import { pull, remove } from 'lodash';
import { ProspectTeamMember } from './prospect-team-member';
import { Product } from 'services';
import { ApiService } from '../api';
import { CmsService } from '../cms';
import { PhoneNumbersService } from '../phone-numbers';
import { FormValidationService } from '../form-validation';
import { ProspectCustomerService } from '../prospect-customer';
import { ServicePack } from '../service-packs';

@Injectable()
export class TeamService {
  public team: ProspectTeamMember[] = [];
  public existingTeam: ProspectTeamMember[] = [];
  private serviceProviderId: string;

  constructor(
    private apiService: ApiService,
    private cms: CmsService,
    private prospectCustomerService: ProspectCustomerService,
    private phoneService: PhoneNumbersService,
    private formValidationService: FormValidationService
  ) {
    this.serviceProviderId = this.cms.getEngine();
    // Restore team from session storage if it exists
    const teamFromSession = JSON.parse(sessionStorage.getItem('buyer-team'));
    const existingTeamFromSession = JSON.parse(sessionStorage.getItem('existing-team'));

    if (teamFromSession) {
      this.team = teamFromSession.map(t => new ProspectTeamMember(t));
    }

    if (existingTeamFromSession) {
      this.existingTeam = existingTeamFromSession.map(t => new ProspectTeamMember(t));
    }
  }

  addTeamMember(fullName: string, email: string, device: Product = null, id = null, servicePack: ServicePack): ProspectTeamMember {
    const phone = this.phoneService.cyclePhoneNumber();
    const newTeamMember = new ProspectTeamMember({ fullName, email, phone, device: device, id: id, servicePack: servicePack });
    this.team.push(newTeamMember);
    this.cacheTeam();
    return newTeamMember;
  }

  addExistingTeamMember(member: ProspectTeamMember) {
    this.existingTeam.push(member);
    this.cacheTeam();
  }

  addTeamMemberByObject(member: ProspectTeamMember) {
    if (!member.phone) {
      const phone = this.phoneService.cyclePhoneNumber();
      member.phone = phone;
    }
    this.team.push(member);
    this.cacheTeam();
  }

  removeTeamMember(teamMember: ProspectTeamMember) {
    this.phoneService.recyclePhoneNumber(teamMember.phone);
    pull(this.team, teamMember);
    this.cacheTeam();
  }

  setTeamMemberDevice(teamMember: ProspectTeamMember, device: Product) {
    teamMember.device = device;
    this.cacheTeam();
  }

  removeTeamMemberDevice(teamMember: ProspectTeamMember) {
    teamMember.device = null;
    this.cacheTeam();
  }

  setTeamMemberServicePack(teamMember: ProspectTeamMember, servicePack: ServicePack) {
    teamMember.servicePack = servicePack;
    this.cacheTeam();
  }

  removeTeamMemberServicePack(teamMember: ProspectTeamMember) {
    teamMember.servicePack = null;
    this.cacheTeam();
  }

  cacheTeam(): void {
    sessionStorage.setItem('buyer-team', JSON.stringify(this.team));
    sessionStorage.setItem('existing-team', JSON.stringify(this.existingTeam));
  }

  isIncomplete(member: ProspectTeamMember): boolean {
    return !(member.fullName && member.email && !this.formValidationService.emailValidator({value: member.email}) && member.phone);
  }

}
