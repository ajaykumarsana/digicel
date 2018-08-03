import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAnalyticsComponent } from './company-analytics.component';

describe('CompanyAnalyticsComponent', () => {
  let component: CompanyAnalyticsComponent;
  let fixture: ComponentFixture<CompanyAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
