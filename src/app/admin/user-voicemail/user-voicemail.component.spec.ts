import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVoicemailComponent } from './user-voicemail.component';

describe('UserVoicemailComponent', () => {
  let component: UserVoicemailComponent;
  let fixture: ComponentFixture<UserVoicemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVoicemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVoicemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
