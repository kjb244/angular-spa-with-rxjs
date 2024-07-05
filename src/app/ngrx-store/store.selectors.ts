import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from '@ngrx/store';
import { cartFeature, selectApiCalls, State } from './store.reducer';
import { take } from 'rxjs';

export const masterSelector = createFeatureSelector<State>('cart');

export const selectorAccounts = createSelector(
  masterSelector,
  (state) => state.apiCalls.core.accounts,
);

export const selectorRestrictions = createSelector(masterSelector, (api) => {
  return api.apiCalls.core.restrictions;
});

export const getCurrentState = async (store: Store) => {
  let state = await store
    .pipe(select(cartFeature.selectCartState), take(1))
    .toPromise();

  return state as State;
};
