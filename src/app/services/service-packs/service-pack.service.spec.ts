import { TestBed, inject } from '@angular/core/testing';

import { ServicePackService } from './service-pack.service';

describe('ServicePackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePackService]
    });
  });

  xit('should be created', inject([ServicePackService], (service: ServicePackService) => {
    expect(service).toBeTruthy();
  }));
});
