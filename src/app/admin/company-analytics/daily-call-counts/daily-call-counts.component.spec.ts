import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCallCountsComponent } from './daily-call-counts.component';

describe('DailyCallCountsComponent', () => {
  let component: DailyCallCountsComponent;
  let fixture: ComponentFixture<DailyCallCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCallCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCallCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
