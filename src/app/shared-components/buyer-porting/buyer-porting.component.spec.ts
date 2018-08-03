import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPortingComponent } from './buyer-porting.component';

describe('PhoneNumberComponent', () => {
  let component: BuyerPortingComponent;
  let fixture: ComponentFixture<BuyerPortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerPortingComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerPortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
