import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSsoButtonComponent } from './google-sso-button.component';

describe('GoogleSsoButtonComponent', () => {
  let component: GoogleSsoButtonComponent;
  let fixture: ComponentFixture<GoogleSsoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSsoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSsoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
