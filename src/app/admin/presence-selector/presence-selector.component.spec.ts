import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceSelectorComponent } from './presence-selector.component';

describe('PresenceSelectorComponent', () => {
  let component: PresenceSelectorComponent;
  let fixture: ComponentFixture<PresenceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
