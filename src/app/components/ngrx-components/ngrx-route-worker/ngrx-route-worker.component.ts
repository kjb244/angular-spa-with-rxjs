import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartFeature, selectRoute } from '../../../ngrx-store/store.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngrx-route-worker',
  templateUrl: './ngrx-route-worker.component.html',
  styleUrls: ['./ngrx-route-worker.component.css'],
})
export class NgrxRouteWorkerComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  //NOT USED ANYMORE since we do it in effect
  ngOnInit(): void {
    this.store.select(selectRoute).subscribe({
      next: (route: string) => {
        if (route !== this.router.url.replace('/', '')) {
          this.router.navigateByUrl('/' + route);
        }
      },
    });
  }
}
