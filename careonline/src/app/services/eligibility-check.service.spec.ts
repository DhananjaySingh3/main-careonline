import { TestBed } from '@angular/core/testing';

import { EligibilityCheckService } from './eligibility-check.service';

describe('EligibilityCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EligibilityCheckService = TestBed.get(EligibilityCheckService);
    expect(service).toBeTruthy();
  });
});
