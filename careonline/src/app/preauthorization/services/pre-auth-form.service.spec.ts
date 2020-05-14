import { TestBed } from '@angular/core/testing';

import { PreAuthFormService } from './pre-auth-form.service';

describe('PreAuthFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreAuthFormService = TestBed.get(PreAuthFormService);
    expect(service).toBeTruthy();
  });
});
