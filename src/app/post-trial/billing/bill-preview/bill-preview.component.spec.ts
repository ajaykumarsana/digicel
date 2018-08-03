import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPreviewComponent } from './bill-preview.component';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { PostTrialService, CmsService, AdminService, UserService, ApiService,
         GroupService, AutoAttendantService, HuntGroupService, MessagingService,
         PresenceService, AvatarService, ChatService, CallingService,
         VoicemailService, ToastService,  } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BillPreviewComponent', () => {
  let component: BillPreviewComponent;
  let fixture: ComponentFixture<BillPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        BillPreviewComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
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
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
