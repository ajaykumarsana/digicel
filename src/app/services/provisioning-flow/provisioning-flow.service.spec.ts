import { TestBed, inject } from '@angular/core/testing';

import { ProvisioningFlowService } from './provisioning-flow.service';

describe('ProvisioningFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvisioningFlowService]
    });
  });

  xit('should be created', inject([ProvisioningFlowService], (service: ProvisioningFlowService) => {
    expect(service).toBeTruthy();
  }));
});
