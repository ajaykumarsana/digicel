import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { ControlMessagesComponent } from '../../../shared-components/control-messages/control-messages.component';
import { TooltipComponent } from '../../../shared-components/tooltip/tooltip.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { PostTrialService, CmsService, AdminService, UserService, ApiService, GroupService, AutoAttendantService,
         HuntGroupService, MessagingService, PresenceService, AvatarService, ChatService, CallingService, VoicemailService,
         ToastService, FormValidationService} from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AccountComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        ControlMessagesComponent,
        TooltipComponent,
        ActionBarComponent
      ],
      providers: [
        PostTrialService,
        CmsService,
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
        ToastService,
        FormValidationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
