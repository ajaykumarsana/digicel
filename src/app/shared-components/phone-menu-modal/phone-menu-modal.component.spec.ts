import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneMenuModalComponent } from './phone-menu-modal.component';

describe('PhoneMenuComponent', () => {
  let component: PhoneMenuModalComponent;
  let fixture: ComponentFixture<PhoneMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMenuModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
