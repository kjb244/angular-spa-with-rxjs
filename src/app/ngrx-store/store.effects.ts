import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StoreActions } from './store.actions';
import { concat, concatMap, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { StoreMockService } from '../services/store-mock.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RulesEngineService } from '../services/rules-engine.service';

@Injectable()
export class StoreEffects {
  constructor(
    private actions: Actions,
    private storeMockService: StoreMockService,
    private router: Router,
    private rulesEngineService: RulesEngineService,
  ) {}

  setRoute$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(StoreActions.setRoute),
        tap((action) => this.router.navigateByUrl('/' + action.route)),
      ),
    { dispatch: false },
  );

  formMainChange$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.formMainChange),
      switchMap((action) => {
        return this.rulesEngineService.updateForm(action.form).pipe(
          map((form) => {
            return StoreActions.formMainChangeSuccess({ form });
          }),
        );
      }),
    ),
  );

  loadCoreData$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getCoreData),
      // this was a pain to get working but need to use concat to make them one after the other
      // also need of(null) then pipe()
      concatMap((action) =>
        concat(
          of(null).pipe(map(() => StoreActions.setLoading({ loading: true }))),
          forkJoin([
            this.storeMockService.getAccounts(),
            this.storeMockService.getRestrictions(),
          ]).pipe(
            map((data) => {
              return StoreActions.getCoreDataSuccess({
                coreData: {
                  accounts: data[0],
                  restrictions: data[1],
                  hasData: true,
                },
              });
            }),
          ),

          of(null).pipe(map(() => StoreActions.setLoading({ loading: false }))),
        ),
      ),
    ),
  );
}
