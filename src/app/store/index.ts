
import {Subject} from 'rxjs';
import { Actions } from './actions';


interface InitialState {
  type: string | null;
  currRoute: string | null;
  formData: { [key: string]: any};
  showPrev: boolean;
  showNext: boolean;
}


let state: InitialState = {
  type: null,
  currRoute: null,
  formData: {},
  showPrev: false,
  showNext: false
};

interface Event {
  type: string;
  payload?: object;
}

export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();


eventDispatcher.subscribe((data: {[key: string]: any}) => {
  switch (data['type']) {

    case Actions.NEXT_VIEW:
      state = {...state};
      state.type = Actions.NEXT_VIEW;
      state.currRoute = data['payload'].nextRoute;
      store.next(state);
      break;

    case Actions.GET_DATA:
      state = {...state};
      state.type = Actions.GET_DATA;
      state.formData = data['payload'].formData;
      state.showNext = data['payload'].showNext;
      state.showPrev = data['payload'].showPrev;
      store.next(state);
      break;

    case Actions.GET_BUTTON_DATA:
      state = {...state};
      state.type = Actions.GET_BUTTON_DATA;
      store.next(state);
      break;



    default:
      break;
  }
});
