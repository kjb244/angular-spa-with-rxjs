import {createActionGroup, props} from "@ngrx/store";

export const StoreActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add To Cart': props<{ productName: string }>(),
    'Remove From Cart': props<{ productName: string }>(),
    'Increment Age': props<{ name: string }>(),
    'Set Loading': props<{loading: boolean}>(),
    'Set Route': props<{route: string}>(),
    'Remove Restriction': props<{id: number}>()
  },
});
