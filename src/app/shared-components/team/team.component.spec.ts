import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { TeamMemberFormComponent } from '../../shared-components/team-member-form/team-member-form.component';
import { PhonePipe } from 'pipes';
import { PortingFormComponent } from '../../shared-components/porting-form/porting-form.component';
import { CatalogComponent } from '../../shared-components/catalog/catalog.component';
import { TooltipComponent } from '../../shared-components/tooltip/tooltip.component';
import { ControlMessagesComponent } from '../../shared-components/control-messages/control-messages.component';
import { ProductComponent } from '../../shared-components/product/product.component';
import { UserService, ApiService, CmsService, GroupService, AutoAttendantService, HuntGroupService, TeamService,
         ProspectCustomerService, ApiErrors, PhoneNumbersService, PortingService, SignUpFlowService } from 'services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        TeamComponent,
        HeaderComponent,
        TeamMemberFormComponent,
        PhonePipe,
        PortingFormComponent,
        CatalogComponent,
        TooltipComponent,
        ControlMessagesComponent,
        ProductComponent
      ],
      providers: [
        UserService,
        ApiService,
        CmsService,
        GroupService,
        AutoAttendantService,
        HuntGroupService,
        TeamService,
        ProspectCustomerService,
        ApiErrors,
        PhoneNumbersService,
        PortingService,
        SignUpFlowService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
