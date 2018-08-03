import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersComponent } from './numbers.component';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { CatalogComponent } from '../../../shared-components/catalog/catalog.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { PhonePipe } from 'pipes';
import { ProductComponent } from '../../../shared-components/product/product.component';
import { CmsService, UserService, ApiService, GroupService, AutoAttendantService, HuntGroupService, PostTrialService,
         AdminService, MessagingService, PresenceService, AvatarService, ChatService, CallingService, VoicemailService,
         ToastService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        NumbersComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        CatalogComponent,
        ActionBarComponent,
        PhonePipe,
        ProductComponent
      ],
      providers: [
        CmsService,
        UserService,
        ApiService,
        GroupService,
        AutoAttendantService,
        HuntGroupService,
        PostTrialService,
        AdminService,
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
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
