import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberFormComponent } from './team-member-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from 'pipes';
import { PortingFormComponent } from '../porting-form/index';
import { CatalogComponent } from '../catalog/index';
import { ProductComponent } from '../product/index';
import { TeamService, ApiService, ApiErrors, CmsService, ProspectCustomerService,
         PhoneNumbersService, PortingService, GroupService, UserService,
         AutoAttendantService, HuntGroupService } from 'services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipComponent } from '../../shared-components/tooltip/tooltip.component';
import { ControlMessagesComponent } from '../../shared-components/control-messages/control-messages.component';

describe('TeamMemberFormComponent', () => {
  let component: TeamMemberFormComponent;
  let fixture: ComponentFixture<TeamMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        FormsModule,
        PipesModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        TeamMemberFormComponent,
        PortingFormComponent,
        CatalogComponent,
        ProductComponent,
        TooltipComponent,
        ControlMessagesComponent
      ],
      providers: [
        TeamService,
        ApiService,
        ApiErrors,
        CmsService,
        ProspectCustomerService,
        PhoneNumbersService,
        PortingService,
        GroupService,
        UserService,
        AutoAttendantService,
        HuntGroupService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
