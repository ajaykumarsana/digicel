import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioModalComponent } from './audio-modal.component';

describe('AudioModalComponent', () => {
  let component: AudioModalComponent;
  let fixture: ComponentFixture<AudioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
