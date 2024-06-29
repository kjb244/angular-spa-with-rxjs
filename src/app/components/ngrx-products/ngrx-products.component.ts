import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {cartFeature, Product, State} from "../../ngrx-store/cart.reducer";
import {Observable} from "rxjs";
import {CartActions} from "../../ngrx-store/cart.actions";

@Component({
  selector: 'app-ngrx-products',
  templateUrl: './ngrx-products.component.html',
  styleUrls: ['./ngrx-products.component.css']
})
export class NgrxProductsComponent implements OnInit{

  public products$: Observable<any>;

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.products$ = this.store.select(cartFeature.selectCartState);
  }

  addToCart(product: Product){
    this.store.dispatch(CartActions.addToCart({productName: product.name}))
  }

  removeFromCart(product: Product){
    this.store.dispatch(CartActions.removeFromCart({productName: product.name}))
  }


}
