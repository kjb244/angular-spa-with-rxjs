import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {createSelector, Store} from "@ngrx/store";
import {cartFeature, FamilyDetails, Product, selectFamilyInfo} from "../../../ngrx-store/store.reducer";

@Component({
  selector: 'app-ngrx-cart',
  templateUrl: './ngrx-cart.component.html',
  styleUrls: ['./ngrx-cart.component.css']
})
export class NgrxCartComponent {
  public cartCount: number;
  public nickAge: number;
  constructor(private store: Store) {
    this.store.select(cartFeature.selectCartState).subscribe({
      next: (value: any) =>{
        this.cartCount = value.products.filter((e: Product) => e.inCart).length;
      }
    })

    const familyInfoNickSelector = createSelector(
      selectFamilyInfo,
      (familyInfo: Record<string, FamilyDetails>) =>{
        return familyInfo['nick']
      }
    )
    this.store.select(familyInfoNickSelector).subscribe({
      next: (e) =>{
        this.nickAge = e.age;
      }
    })
  }
}
