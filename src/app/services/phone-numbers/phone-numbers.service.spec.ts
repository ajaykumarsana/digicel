import { TestBed, inject } from '@angular/core/testing';

import { PhoneNumbersService } from './phone-numbers.service';
import { CmsService, ApiService, ApiErrors } from 'services';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('PhoneNumbersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        PhoneNumbersService,
        ApiService,
        ApiErrors,
        CmsService
      ]
    });
  });

  it('should be created', inject([PhoneNumbersService], (service: PhoneNumbersService) => {
    expect(service).toBeTruthy();
  }));
});
