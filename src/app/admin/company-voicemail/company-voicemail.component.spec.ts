import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVoicemailComponent } from './company-voicemail.component';

describe('CompanyVoicemailComponent', () => {
  let component: CompanyVoicemailComponent;
  let fixture: ComponentFixture<CompanyVoicemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyVoicemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVoicemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
