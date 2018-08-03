import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishComponent } from './finish.component';
import { HeaderBarComponent } from '../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../partials/pt-progress-bar/pt-progress-bar.component';
import { ActionBarComponent } from '../partials/action-bar/action-bar.component';
import { CmsService, PostTrialService, AdminService, UserService, ApiService, GroupService,
         AutoAttendantService, HuntGroupService, MessagingService, PresenceService, AvatarService,
         ChatService, CallingService, VoicemailService, ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FinishComponent', () => {
  let component: FinishComponent;
  let fixture: ComponentFixture<FinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        FinishComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        ActionBarComponent
      ],
      providers: [
        CmsService,
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
    fixture = TestBed.createComponent(FinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
