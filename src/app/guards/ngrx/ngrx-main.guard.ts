import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { store } from '../../store';
import { mergeMap, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorCore } from '../../ngrx-store/store.selectors';
import { Injectable } from '@angular/core';
import { CoreData } from '../../ngrx-store/store.reducer';
import { StoreActions } from '../../ngrx-store/store.actions';

@Injectable({
  providedIn: 'root',
})
export class ngrxMainGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.select(selectorCore).pipe(
      mergeMap((e: CoreData) => {
        if (!e.hasData) {
          this.store.dispatch(StoreActions.setRoute({ route: 'ngrx-spinner' }));
        }
        return of(e.hasData);
      }),
    );
  }
}
