import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneMenuComponent } from './phone-menu.component';

describe('PhoneMenuComponent', () => {
  let component: PhoneMenuComponent;
  let fixture: ComponentFixture<PhoneMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
