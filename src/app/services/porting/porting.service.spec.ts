import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PortingService } from './porting.service';
import { CmsService, UserService, ApiService,
  GroupService, AutoAttendantService, HuntGroupService } from 'services';
import { HttpClientModule } from '@angular/common/http';

describe('PortingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        PortingService,
        ApiService,
        CmsService,
        GroupService,
        UserService,
        AutoAttendantService,
        HuntGroupService
      ]
    });
  });

  it('should be created', inject([PortingService], (service: PortingService) => {
    expect(service).toBeTruthy();
  }));
});
