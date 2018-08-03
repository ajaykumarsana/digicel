import { TestBed, inject } from '@angular/core/testing';

import { AvatarService } from './avatar.service';

describe('AvatarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvatarService]
    });
  });

  xit('should be created', inject([AvatarService], (service: AvatarService) => {
    expect(service).toBeTruthy();
  }));
});
