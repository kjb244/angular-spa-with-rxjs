
import {Subject} from 'rxjs';
import { Actions } from './actions';
import { InitialState } from '../models/state';




let state: InitialState = {
  type: null,
  currRoute: null,
  formData: {},
  showPrev: false,
  showNext: false,
  accounts: [
    {
      name: 'ret 1',
      editing: false,
      benes: [
        {
          type: 'test',
          name: 'john b'
        },
        {
          type: 'test',
          name: 'harry'
        }
      ]
    },
    {
      name: 'ret 2',
      editing: false,
      benes: [
        {
          type: 'test',
          name: 'harry h'
        }
      ]
    },
  ]
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


    case Actions.GET_ACCOUNT_INFO:
      state = {...state};
      state.type = Actions.GET_ACCOUNT_INFO;
      store.next(state);
      break;

    case Actions.EDIT_CARD:
      state = {...state};
      state.type = Actions.EDIT_CARD;
      const accounts = state.accounts.map((e) => {
        return {...e, editing: false};
      });
      const accountId = data['payload'].accountId;
      accounts[accountId].editing = true;
      state.accounts = accounts;
      store.next(state);
      break;



    default:
      break;
  }
});
