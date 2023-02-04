import { Component, OnInit } from '@angular/core';
import {EventEmitterService} from "../../services/event-emitter.service";
import {Observable} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products$: Observable<Product[]>;
  constructor(private eventEmitterService: EventEmitterService) {
    this.products$ = eventEmitterService.productEmitter$;
  }

  ngOnInit(): void {
  }

  addToCart(product: Product){
    this.eventEmitterService.addToCart(product);
  }

  removeFromCart(product: Product){
    this.eventEmitterService.removeFromCart(product);
  }

}
