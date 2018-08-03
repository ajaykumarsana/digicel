import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlueBillingSummaryComponent } from './glue-billing-summary.component';

describe('GlueBillingSummaryComponent', () => {
  let component: GlueBillingSummaryComponent;
  let fixture: ComponentFixture<GlueBillingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlueBillingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlueBillingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
