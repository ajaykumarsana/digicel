import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCallHistoryComponent } from './company-call-history.component';

describe('CompanyCallHistoryComponent', () => {
  let component: CompanyCallHistoryComponent;
  let fixture: ComponentFixture<CompanyCallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCallHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
