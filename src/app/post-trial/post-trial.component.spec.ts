import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTrialComponent } from './post-trial.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PostTrialService, CmsService, UserService, ApiService, CatalogService } from 'services';
import { HttpClientModule } from '@angular/common/http';

describe('PostTrialComponent', () => {
  let component: PostTrialComponent;
  let fixture: ComponentFixture<PostTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        PostTrialComponent
      ],
      providers: [
        CmsService,
        UserService,
        ApiService,
        CatalogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
