import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigicelLoginComponent } from './digicel-login.component';

describe('DigicelLoginComponent', () => {
  let component: DigicelLoginComponent;
  let fixture: ComponentFixture<DigicelLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigicelLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigicelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
