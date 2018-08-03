import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtueComponent } from './ftue.component';

describe('FtueComponent', () => {
  let component: FtueComponent;
  let fixture: ComponentFixture<FtueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
