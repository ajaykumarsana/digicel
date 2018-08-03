import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponent } from '../../partials/header-bar/header-bar.component';
import { PtProgressBarComponent } from '../../partials/pt-progress-bar/pt-progress-bar.component';
import { ControlMessagesComponent } from '../../../shared-components/control-messages/control-messages.component';
import { ActionBarComponent } from '../../partials/action-bar/action-bar.component';
import { CmsService, UserService, ApiService, FormValidationService } from 'services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        ShippingFormComponent,
        HeaderBarComponent,
        PtProgressBarComponent,
        ControlMessagesComponent,
        ActionBarComponent
      ],
      providers: [
        CmsService,
        UserService,
        ApiService,
        FormValidationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
