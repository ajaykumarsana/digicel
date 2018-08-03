import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLevelComponent } from './group-level.component';
import { BrandHeaderComponent } from '../shared-components/brand-header';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsService, SignUpFlowService } from 'services';

describe('GroupLevelComponent', () => {
  let component: GroupLevelComponent;
  let fixture: ComponentFixture<GroupLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GroupLevelComponent,
        BrandHeaderComponent
      ],
      providers: [
        CmsService,
        SignUpFlowService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
