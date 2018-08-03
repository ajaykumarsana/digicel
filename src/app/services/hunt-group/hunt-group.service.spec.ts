import { TestBed, inject } from '@angular/core/testing';

import { HuntGroupService } from './hunt-group.service';

describe('HuntGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuntGroupService]
    });
  });

  xit('should be created', inject([HuntGroupService], (service: HuntGroupService) => {
    expect(service).toBeTruthy();
  }));
});
