import { TestBed, inject } from '@angular/core/testing';

import { PostTrialService } from './post-trial.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsService, AdminService, UserService, ApiService,
         GroupService, AutoAttendantService, HuntGroupService,
         MessagingService, PresenceService, AvatarService, ChatService,
         CallingService, VoicemailService, ToastService } from 'services';
import { HttpClientModule } from '@angular/common/http';

describe('PostTrialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule
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
        ToastService
      ]
    });
  });

  it('should be created', inject([PostTrialService], (service: PostTrialService) => {
    expect(service).toBeTruthy();
  }));
});
