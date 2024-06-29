import {createActionGroup, props} from "@ngrx/store";

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add To Cart': props<{ productName: string }>(),
    'Remove From Cart': props<{ productName: string }>()
  },
});
