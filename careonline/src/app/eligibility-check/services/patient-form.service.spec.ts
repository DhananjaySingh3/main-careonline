import { TestBed } from '@angular/core/testing';

import { PatientFormService } from './patient-form.service';

describe('PatientFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientFormService = TestBed.get(PatientFormService);
    expect(service).toBeTruthy();
  });
});
