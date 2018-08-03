import { TestBed, inject } from '@angular/core/testing';
import { ProspectCustomerService } from './prospect-customer.service';

describe('ProspectCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProspectCustomerService]
    });
  });

  xit('should be created', inject([ProspectCustomerService], (service: ProspectCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
