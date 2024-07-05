import {createSelector, select, Store} from "@ngrx/store";
import {cartFeature, State} from "./store.reducer";
import {take} from "rxjs";

export const selectorFamilyInfo = (state: State) => state.familyInfo;
export const selectorFamilyArr =
  createSelector(selectorFamilyInfo, (allItems) => {
    return allItems['nick'];
  });

export const getCurrentState = async (store: Store) => {
  let state = await store
    .pipe(
      select(cartFeature.selectCartState),
      take(1)
    )
    .toPromise();

  return state as State;
}
