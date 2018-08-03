import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNavComponent } from './sign-up-nav.component';

describe('SignUpNavComponent', () => {
  let component: SignUpNavComponent;
  let fixture: ComponentFixture<SignUpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
