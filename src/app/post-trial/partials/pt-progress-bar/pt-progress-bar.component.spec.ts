import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtProgressBarComponent } from './pt-progress-bar.component';
import { CmsService, PostTrialService, AdminService, UserService,
  ApiService, GroupService, AutoAttendantService, HuntGroupService,
  MessagingService, PresenceService, AvatarService, ChatService,
  CallingService, VoicemailService, ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PtProgressBarComponent', () => {
  let component: PtProgressBarComponent;
  let fixture: ComponentFixture<PtProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        PtProgressBarComponent
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
    fixture = TestBed.createComponent(PtProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
