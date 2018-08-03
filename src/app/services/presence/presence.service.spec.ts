import { TestBed, inject } from '@angular/core/testing';

import { PresenceService } from './presence.service';

describe('PresenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresenceService]
    });
  });

  xit('should be created', inject([PresenceService], (service: PresenceService) => {
    expect(service).toBeTruthy();
  }));
});
