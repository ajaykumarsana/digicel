import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { ControlMessagesComponent } from '../../../shared-components/control-messages';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { CmsService, FormValidationService, PostTrialService, AdminService, UserService, ApiService,
         GroupService, AutoAttendantService, HuntGroupService, MessagingService, PresenceService, AvatarService,
         ChatService, CallingService, VoicemailService, ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        PaymentComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        ControlMessagesComponent,
        ActionBarComponent
      ],
      providers: [
        CmsService,
        FormValidationService,
        PostTrialService,
        AdminService,
        UserService,
        ApiService,
        GroupService,
        AutoAttendantService,
        HuntGroupService,
        MessagingService,
        PresenceService,
        AvatarService,
        ChatService,
        CallingService,
        VoicemailService,
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
