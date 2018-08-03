import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDisplayComponent } from './company-display.component';

describe('CompanyDisplayComponent', () => {
  let component: CompanyDisplayComponent;
  let fixture: ComponentFixture<CompanyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
