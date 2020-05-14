import { TestBed } from '@angular/core/testing';

import { PreAuthService } from './pre-auth.service';

describe('PreAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreAuthService = TestBed.get(PreAuthService);
    expect(service).toBeTruthy();
  });
});
