import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDirectionComponent } from './call-direction.component';

describe('CallDirectionComponent', () => {
  let component: CallDirectionComponent;
  let fixture: ComponentFixture<CallDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
