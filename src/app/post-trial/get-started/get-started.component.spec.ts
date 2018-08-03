import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStartedComponent } from './get-started.component';
import { HeaderBarComponent } from '../../post-trial/partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../post-trial/partials/pt-progress-bar/pt-progress-bar.component';
import { ActionBarComponent } from '../../post-trial/partials/action-bar/action-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CmsService, PostTrialService, AdminService, UserService, ApiService, GroupService, AutoAttendantService,
         HuntGroupService, MessagingService, PresenceService, AvatarService, ChatService, CallingService,
         VoicemailService, ToastService } from 'services';

describe('GetStartedComponent', () => {
  let component: GetStartedComponent;
  let fixture: ComponentFixture<GetStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        GetStartedComponent,
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
    fixture = TestBed.createComponent(GetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
