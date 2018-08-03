import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceMailComponent } from './voicemail.component';

describe('VoiceMailComponent', () => {
  let component: VoiceMailComponent;
  let fixture: ComponentFixture<VoiceMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
