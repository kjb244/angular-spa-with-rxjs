import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {cartFeature, Product} from "../../../ngrx-store/cart.reducer";

@Component({
  selector: 'app-ngrx-cart',
  templateUrl: './ngrx-cart.component.html',
  styleUrls: ['./ngrx-cart.component.css']
})
export class NgrxCartComponent {
  public cartCount: number;
  constructor(private store: Store) {
    this.store.select(cartFeature.selectCartState).subscribe({
      next: (value: any) =>{
        this.cartCount = value.products.filter((e: Product) => e.inCart).length;
      }
    })
  }
}
