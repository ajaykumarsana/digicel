import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LOAComponent } from './loa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { ControlMessagesComponent } from '../../../shared-components/control-messages/control-messages.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { CmsService, FormValidationService, PostTrialService, AdminService, UserService, ApiService, GroupService,
         AutoAttendantService, HuntGroupService, MessagingService, PresenceService, AvatarService, ChatService,
         CallingService, VoicemailService, ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('LOAComponent', () => {
  let component: LOAComponent;
  let fixture: ComponentFixture<LOAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        LOAComponent,
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
    fixture = TestBed.createComponent(LOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
