import { createFeature, createReducer, on } from '@ngrx/store';
import {CartActions} from "./cart.actions";


export interface State {
  products: Product[]
}

export interface Product{
  name: string;
  inCart: boolean;
}

const initialState: State = {
  products: [{name: 'iphone', inCart: false}, {name: 'android', inCart: false}]
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.addToCart, (state, {productName}) => {
      return {
        ...state,
        products: state.products.map((product) =>{
          const rtnEle = {...product};
          if(rtnEle.name === productName){
            rtnEle.inCart = true;
          }
          return rtnEle;
        })
      }
      }),
    on(CartActions.removeFromCart, (state, { productName }) => {
      return {
        ...state,
        products: state.products.map((product) =>{
          const rtnEle = {...product};
          if(rtnEle.name === productName){
            rtnEle.inCart = false;
          }
          return rtnEle;
        })
      }
    })

  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectProducts, // feature selector
} = cartFeature;
