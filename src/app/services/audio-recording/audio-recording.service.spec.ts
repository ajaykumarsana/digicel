import { TestBed, inject } from '@angular/core/testing';

import { AudioRecordingService } from './audio-recording.service';

describe('AudioRecordingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioRecordingService]
    });
  });

  xit('should be created', inject([AudioRecordingService], (service: AudioRecordingService) => {
    expect(service).toBeTruthy();
  }));
});
