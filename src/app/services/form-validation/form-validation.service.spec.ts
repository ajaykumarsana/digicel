import { TestBed, inject } from '@angular/core/testing';

import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService]
    });
  });

  xit('should be created', inject([FormValidationService], (service: FormValidationService) => {
    expect(service).toBeTruthy();
  }));
});
