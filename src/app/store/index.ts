
import {Subject} from 'rxjs';
import { Actions } from './actions';

interface RouteMappingInner{
  next: string | null,
  prev: string | null,
  formData: { [key: string]: any }
}

interface RouteMapping {
  [key: string]: RouteMappingInner
}

interface InitialState {
  type: string | null
  routes: string[],
  currRoute: string | null,
  routeMapping: RouteMapping
}


let state: InitialState = {
  type: null,
  routes: ['view1','view2'],
  currRoute: 'view1',
  routeMapping:{
    'view1': {
      next: 'view2',
      prev: null,
      formData: {}
    },
    'view2': {
      next: null,
      prev: 'view1',
      formData: {}
    }
  }
};

interface Event {
  type: string;
  payload?: object;
}

export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

function mapStateAndReturnIt(action: string, payload: object, state: InitialState){
  let currRoute = state.currRoute;
  const routeMapping = state.routeMapping[currRoute || ''];
  routeMapping.formData = payload || {};
  const nextRoute = action === Actions.CLICK_NEXT ? routeMapping.next: routeMapping.prev;
  return {...state, currRoute: nextRoute, type: action};

}

eventDispatcher.subscribe((data: Event) => {
  switch (data.type) {

    case Actions.GET_DATA:
      state = {...state, type:Actions.GET_DATA };
      store.next(state);
      break;

    case Actions.CLICK_NEXT:
      state = {...state};;
      state = mapStateAndReturnIt(Actions.CLICK_NEXT, data.payload || {}, state);
      store.next(state);
      break;

    case Actions.CLICK_PREVIOUS:
      state = {...state};
      state = mapStateAndReturnIt(Actions.CLICK_PREVIOUS, data.payload || {}, state);
      store.next(state);
      break;


    default:
      break;
  }
});
