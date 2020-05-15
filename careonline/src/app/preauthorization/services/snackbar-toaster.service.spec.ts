import { TestBed } from '@angular/core/testing';

import { SnackbarToasterService } from './snackbar-toaster.service';

describe('SnackbarToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarToasterService = TestBed.get(SnackbarToasterService);
    expect(service).toBeTruthy();
  });
});
