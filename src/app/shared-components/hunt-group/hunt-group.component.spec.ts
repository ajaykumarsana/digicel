import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntGroupComponent } from './hunt-group.component';

describe('HuntGroupComponent', () => {
  let component: HuntGroupComponent;
  let fixture: ComponentFixture<HuntGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntGroupComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
