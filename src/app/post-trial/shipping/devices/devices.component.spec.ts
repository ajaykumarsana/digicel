import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { PipesModule } from 'pipes';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { CatalogComponent } from '../../../shared-components/catalog/catalog.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { ProductComponent } from '../../../shared-components/product/product.component';
import { PostTrialService, CmsService, AdminService, UserService, ApiService, GroupService, AutoAttendantService,
         HuntGroupService, MessagingService, PresenceService, AvatarService, ChatService, CallingService,
         VoicemailService, ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        PipesModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        DevicesComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        CatalogComponent,
        ActionBarComponent,
        ProductComponent
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
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
