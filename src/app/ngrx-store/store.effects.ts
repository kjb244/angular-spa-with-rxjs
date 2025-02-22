import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StoreActions } from './store.actions';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { StoreMockService } from '../services/store-mock.service';
import { Injectable } from '@angular/core';
import { CoreData } from './store.reducer';

@Injectable()
export class StoreEffects {
  constructor(
    private actions: Actions,
    private storeMockService: StoreMockService,
  ) {}

  loadCoreData$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getCoreData),
      switchMap(() => {
        return forkJoin([
          this.storeMockService.getAccounts(),
          this.storeMockService.getRestrictions(),
        ]).pipe(
          map((success) =>
            StoreActions.getCoreDataSuccess({
              coreData: { accounts: success[0], restrictions: success[1] },
            }),
          ),
        );
      }),
    ),
  );
}
