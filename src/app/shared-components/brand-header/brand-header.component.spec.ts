import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandHeaderComponent } from './brand-header.component';

describe('BrandHeaderComponent', () => {
  let component: BrandHeaderComponent;
  let fixture: ComponentFixture<BrandHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
