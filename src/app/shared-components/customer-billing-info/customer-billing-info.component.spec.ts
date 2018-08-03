import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillingInfoComponent } from './customer-billing-info.component';

describe('CustomerBillingInfoComponent', () => {
  let component: CustomerBillingInfoComponent;
  let fixture: ComponentFixture<CustomerBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBillingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
