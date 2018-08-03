import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogEntryComponent } from './call-log-entry.component';

describe('CallLogEntryComponent', () => {
  let component: CallLogEntryComponent;
  let fixture: ComponentFixture<CallLogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallLogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
