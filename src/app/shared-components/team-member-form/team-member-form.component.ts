import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product, TeamService, ServicePack } from 'services';
import { ProspectTeamMember, PortingService, CmsService, FormValidationService } from 'services';

@Component({
  selector: 'app-team-member-form',
  templateUrl: './team-member-form.component.html',
  styleUrls: ['./team-member-form.component.scss']
})
export class TeamMemberFormComponent implements OnInit {

  public memberForm: FormGroup;
  @Input() member: ProspectTeamMember;
  @Input() index;
  @Input() existingMember: boolean;
  public portNumber: string;
  public showPortForm = false;
  public showAppCatalog = false;
  public showAppServicePacks = false;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  public addDeviceLabel = this.cms.get('teamMemberFormComponentAddDevice');
  public addServicePackLabel = this.cms.get('teamMemberFormComponentAddServicePack');


  constructor(public fb: FormBuilder,
              public teamService: TeamService,
              public cms: CmsService,
              private portingService: PortingService,
              private formValidationService: FormValidationService
  ) {}

  ngOnInit() {
    this.memberForm = this.fb.group({
      'fullName': [{value: this.member.fullName, disabled: this.existingMember}, Validators.required],
      'email': [{value: this.member.email, disabled: this.existingMember}, Validators.compose(
        [Validators.required, this.formValidationService.emailValidator])]
    });

    this.portNumber = this.portingService.getPortRequestNumberByTempNumber(this.member.phone);

    this.onFormUpdate();
  }

  // Hide / show buyer-porting form
  togglePortForm(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.showAppCatalog === true) {
      this.showAppCatalog = false;
    }

    if (this.showAppServicePacks === true) {
      this.showAppServicePacks = false;
    }

    this.showPortForm = !this.showPortForm;
  }

  // Remove Team Member (pass through function)
  removeMember(index) {
    this.onRemove.emit(index);
  }

  // Add device to this team member
  addDevice(device: Product) {
    this.member.device = device;
    this.toggleCatalog();
  }

  // Remove device from this team member
  removeDevice(device: Product) {
    this.member.device = null;
    this.toggleCatalog();
  }

  // Display the device catalog
  toggleCatalog() {
    if (this.showPortForm === true ) {
      this.showPortForm = false;
    }

    if (this.showAppServicePacks === true) {
      this.showAppServicePacks = false;
    }

    this.showAppCatalog = !this.showAppCatalog;
  }

  // Add service pack to this team member
  addServicePack(servicePack: ServicePack) {
    this.member.servicePack = servicePack;
    this.toggleServicePacks();
  }

  // Remove service from this team member
  removeServicePack(servicePack: ServicePack) {
    this.member.servicePack = null;
    this.toggleServicePacks();
  }

  // Display the provider service packs
  toggleServicePacks() {
    if (this.showPortForm === true ) {
      this.showPortForm = false;
    }

    if (this.showAppCatalog === true ) {
      this.showAppCatalog = false;
    }

    this.showAppServicePacks = !this.showAppServicePacks;
  }

  port($event) {
    this.togglePortForm(null);
    this.portNumber = $event;
  }

  // Updates team member as form is updated
  onFormUpdate(): void {
    this.memberForm.valueChanges.subscribe(response => {
      this.member['fullName'] = response.fullName;
      this.member['email'] = response.email;

      this.teamService.team[this.index] = this.member;
      this.teamService.cacheTeam();
    });

  }

}
