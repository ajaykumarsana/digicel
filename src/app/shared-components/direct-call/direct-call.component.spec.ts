import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCallComponent } from './direct-call.component';

describe('DirectCallComponent', () => {
  let component: DirectCallComponent;
  let fixture: ComponentFixture<DirectCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectCallComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
