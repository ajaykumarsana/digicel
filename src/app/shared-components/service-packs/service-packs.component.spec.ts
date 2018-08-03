import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePacksComponent } from './service-packs.component';

describe('ServicePacksComponent', () => {
  let component: ServicePacksComponent;
  let fixture: ComponentFixture<ServicePacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
