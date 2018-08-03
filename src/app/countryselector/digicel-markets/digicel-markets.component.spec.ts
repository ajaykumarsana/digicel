import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigicelMarketsComponent } from './digicel-markets.component';

describe('DigicelMarketsComponent', () => {
  let component: DigicelMarketsComponent;
  let fixture: ComponentFixture<DigicelMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigicelMarketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigicelMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
