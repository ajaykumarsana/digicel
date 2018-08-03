import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePackComponent } from './service-pack.component';

describe('ServicePackComponent', () => {
  let component: ServicePackComponent;
  let fixture: ComponentFixture<ServicePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
