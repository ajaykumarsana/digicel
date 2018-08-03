import { TestBed, inject } from '@angular/core/testing';

import { VoicemailService } from './voicemail.service';

describe('VoicemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoicemailService]
    });
  });

  xit('should be created', inject([VoicemailService], (service: VoicemailService) => {
    expect(service).toBeTruthy();
  }));
});
