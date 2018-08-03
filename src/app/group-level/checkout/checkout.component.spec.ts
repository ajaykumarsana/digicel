import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { HeaderComponent } from '../../shared-components/header';
import { PhonePipe } from 'pipes';
import { FormsModule } from '@angular/forms';
import { ActionBarComponent } from '../partials/action-bar/action-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsService, UserService, ApiService, GroupService,
         AutoAttendantService, HuntGroupService, TeamService,
         ProspectCustomerService, ApiErrors, PhoneNumbersService,
         OrderService, PortingService } from 'services';
import { HttpClientModule } from '@angular/common/http';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        CheckoutComponent,
        HeaderComponent,
        PhonePipe,
        ActionBarComponent
      ],
      providers: [
        CmsService,
        UserService,
        ApiService,
        GroupService,
        AutoAttendantService,
        HuntGroupService,
        TeamService,
        ProspectCustomerService,
        ApiErrors,
        PhoneNumbersService,
        OrderService,
        PortingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
