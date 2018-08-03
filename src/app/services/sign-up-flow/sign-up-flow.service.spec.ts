import { TestBed, inject } from '@angular/core/testing';

import { SignUpFlowService } from './sign-up-flow.service';

describe('SignUpFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpFlowService]
    });
  });

  xit('should be created', inject([SignUpFlowService], (service: SignUpFlowService) => {
    expect(service).toBeTruthy();
  }));
});
