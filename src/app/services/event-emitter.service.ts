import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private initialProducts: Product[] = [
    {
      itemId: '1234',
      description: 'Iphone',
      inCart: false
    },
    {
      itemId: '5678',
      description: 'Ipad',
      inCart: false
    }
  ]
  private _productEmitter = new BehaviorSubject<Product[]>(this.initialProducts);
  public readonly productEmitter$ = this._productEmitter.asObservable();

  constructor() { }

  public addToCart(product: Product){
    const record: Product = this.initialProducts.find(p => p.itemId === product.itemId)!;
    if (record){
      record.inCart = true;
      this._productEmitter.next(this.initialProducts);
    }
  }

  public removeFromCart(product: Product){
    const record: Product = this.initialProducts.find(p => p.itemId === product.itemId)!;
    if (record){
      record.inCart = false;
      this._productEmitter.next(this.initialProducts);
    }
  }
}
