import { CanActivateFn, Router } from '@angular/router';
import { store } from '../store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const { currRoute } = store.getValue();
  const router: Router = inject(Router);
  if (!currRoute) {
    router.navigateByUrl('/' + 'splash');
    return false;
  }
  return true;
};
