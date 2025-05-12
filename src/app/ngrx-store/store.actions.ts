import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CoreData, FormMain } from './store.reducer';

export const StoreActions = createActionGroup({
  source: 'Cart',
  events: {
    'Get Core Data': emptyProps(),
    'Get Core Data Success': props<{ coreData: CoreData }>(),
    'Add To Cart': props<{ productName: string }>(),
    'Remove From Cart': props<{ productName: string }>(),
    'Increment Age': props<{ name: string }>(),
    'Set Loading': props<{ loading: boolean }>(),
    'Set Route': props<{ route: string }>(),
    'Remove Restriction': props<{ id: number }>(),
    'Form Main Change': props<{ form: FormMain }>(),
    'Form Main Change Success': props<{ form: FormMain }>(),
  },
});
