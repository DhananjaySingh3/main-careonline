import { TestBed } from '@angular/core/testing';

import { EligibilityToasterService } from './eligibility-toaster.service';

describe('EligibilityToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EligibilityToasterService = TestBed.get(EligibilityToasterService);
    expect(service).toBeTruthy();
  });
});
