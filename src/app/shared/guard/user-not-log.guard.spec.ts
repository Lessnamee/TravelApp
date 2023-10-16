import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotLogGuard } from './user-not-log.guard';

describe('userNotLogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotLogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
