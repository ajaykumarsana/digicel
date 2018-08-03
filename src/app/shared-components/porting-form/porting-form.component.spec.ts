import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortingFormComponent } from './porting-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneNumbersService, ApiService, CmsService,
         ApiErrors, PortingService, GroupService, UserService, AutoAttendantService,
         HuntGroupService, FormValidationService, ProspectCustomerService } from 'services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipComponent } from '../../shared-components/tooltip/tooltip.component';
import { ControlMessagesComponent } from '../../shared-components/control-messages/control-messages.component';

describe('PortingFormComponent', () => {
  let component: PortingFormComponent;
  let fixture: ComponentFixture<PortingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        PortingFormComponent,
        TooltipComponent,
        ControlMessagesComponent
      ],
      providers: [
        PhoneNumbersService,
        ApiService,
        ApiErrors,
        PortingService,
        GroupService,
        UserService,
        AutoAttendantService,
        HuntGroupService,
        CmsService,
        FormValidationService,
        ProspectCustomerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
