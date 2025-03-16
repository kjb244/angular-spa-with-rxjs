import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreActions } from './store.actions';

export interface State {
  route: string;
  products: Product[];
  familyInfo: Record<string, FamilyDetails>;
  loading: boolean;
  apiCalls: {
    core: CoreData;
  };
}

export interface CoreData {
  hasData: boolean;
  accounts: Account[];
  restrictions: Restriction[];
}
export interface Restriction {
  id: number;
  limited: boolean;
}
export interface Account {
  id: number;
  description: string;
}

export interface FamilyDetails {
  hairColor: string;
  age: number;
}

export interface Product {
  name: string;
  inCart: boolean;
}

const initialState: State = {
  route: 'ngrx-spinner',
  products: [
    { name: 'iphone', inCart: false },
    { name: 'android', inCart: false },
  ],
  familyInfo: {
    nick: {
      age: 30,
      hairColor: 'brown',
    },
    harry: {
      age: 20,
      hairColor: 'red',
    },
  },
  loading: false,
  apiCalls: {
    core: {
      hasData: false,
      accounts: [],
      restrictions: [],
    },
  },
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(StoreActions.getCoreDataSuccess, (state, { coreData }) => {
      return {
        ...state,
        apiCalls: {
          ...state.apiCalls,
          core: {
            ...coreData,
          },
        },
      };
    }),
    on(StoreActions.addToCart, (state, { productName }) => {
      return {
        ...state,
        products: state.products.map((product) => {
          const rtnEle = { ...product };
          if (rtnEle.name === productName) {
            rtnEle.inCart = true;
          }
          return rtnEle;
        }),
      };
    }),
    on(StoreActions.removeFromCart, (state, { productName }) => {
      return {
        ...state,
        products: state.products.map((product) => {
          const rtnEle = { ...product };
          if (rtnEle.name === productName) {
            rtnEle.inCart = false;
          }
          return rtnEle;
        }),
      };
    }),
    on(StoreActions.incrementAge, (state, { name }) => {
      const currFamilyInfo = state.familyInfo[name];
      return {
        ...state,
        familyInfo: {
          ...state.familyInfo,
          [name]: {
            ...currFamilyInfo,
            age: currFamilyInfo.age + 1,
          },
        },
      };
    }),
    on(StoreActions.setLoading, (state, { loading }) => {
      return {
        ...state,
        loading,
      };
    }),
    on(StoreActions.setRoute, (state, { route }) => {
      return {
        ...state,
        route,
      };
    }),
    on(StoreActions.removeRestriction, (state, { id }) => {
      return {
        ...state,
        apiCalls: {
          ...state.apiCalls,
          core: {
            ...state.apiCalls.core,
            restrictions: state.apiCalls.core.restrictions.filter(
              (restriction) => {
                return restriction.id !== id;
              },
            ),
          },
        },
      };
    }),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectLoading, // feature selector
  selectRoute, //feature selector
  selectApiCalls,
} = cartFeature;
