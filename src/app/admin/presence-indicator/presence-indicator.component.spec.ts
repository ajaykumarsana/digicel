import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceIndicatorComponent } from './presence-indicator.component';

describe('PresenceIndicatorComponent', () => {
  let component: PresenceIndicatorComponent;
  let fixture: ComponentFixture<PresenceIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
