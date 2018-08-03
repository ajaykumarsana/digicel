import { TestBed, inject } from '@angular/core/testing';

import { AutoAttendantService } from './auto-attendant.service';

describe('AutoAttendantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoAttendantService]
    });
  });

  xit('should be created', inject([AutoAttendantService], (service: AutoAttendantService) => {
    expect(service).toBeTruthy();
  }));
});
