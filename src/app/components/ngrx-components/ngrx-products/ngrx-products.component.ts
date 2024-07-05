import {Component, OnInit} from '@angular/core';
import {createSelector, select, Store} from "@ngrx/store";
import {
  cartFeature,
  FamilyDetails,
  Product,
  selectFamilyInfo,
  selectProducts,
  State
} from "../../../ngrx-store/store.reducer";
import {Observable, take} from "rxjs";
import {StoreActions} from "../../../ngrx-store/store.actions";
import * as selectors from '../../../ngrx-store/store.reducer';
import {state} from "@angular/animations";
import {getCurrentState, selectorFamilyArr} from "../../../ngrx-store/store.selectors";


@Component({
  selector: 'app-ngrx-components',
  templateUrl: './ngrx-products.component.html',
  styleUrls: ['./ngrx-products.component.css']
})
export class NgrxProductsComponent implements OnInit{

  public products$: Observable<any>;

  constructor(private store: Store) {


  }

  async ngOnInit() {
    //if we need to get curr state it comes back as behavior subject
    const currState = await getCurrentState(this.store)
    console.log('currentState',currState);

    this.products$ = this.store.select(cartFeature.selectCartState);


  }



  addToCart(product: Product){
    this.store.dispatch(StoreActions.addToCart({productName: product.name}))
  }

  removeFromCart(product: Product){
    this.store.dispatch(StoreActions.removeFromCart({productName: product.name}))
  }

  addNickAge(name: string){
    this.store.dispatch(StoreActions.incrementAge({ name }))
  }


}
