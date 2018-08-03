import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortingComponent } from './porting.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BuyerPortingComponent', () => {
  let component: PortingComponent;
  let fixture: ComponentFixture<PortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ PortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
