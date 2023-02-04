import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from "../../services/event-emitter.service";
import {filter, map, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public cartCount: Number = 0;
  public currRoute: string = '';
  subscription: Subscription;
  constructor(private eventEmitterService: EventEmitterService, private router: Router) {
    this.subscription = this.eventEmitterService.productEmitter$.subscribe((data) => {
      this.cartCount = data.filter(r => r.inCart === true).length;
    });
    this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd)
        this.currRoute = value.url;
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
