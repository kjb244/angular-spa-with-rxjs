import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mvpGuard } from './mvp.guard';

describe('mvpGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mvpGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
