import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../../ngrx-store/store.actions';
import { selectLoading } from '../../../ngrx-store/store.reducer';

@Component({
  selector: 'app-ngrx-spinner',
  templateUrl: './ngrx-spinner.component.html',
  styleUrls: ['./ngrx-spinner.component.css'],
})
export class NgrxSpinnerComponent implements OnInit {
  public loading$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    of(undefined)
      .pipe(
        tap({
          next: () => {
            this.store.dispatch(StoreActions.setLoading({ loading: true }));
          },
        }),
        delay(2000),
        tap({
          next: () => {
            this.store.dispatch(StoreActions.setLoading({ loading: false }));
            this.store.dispatch(StoreActions.setRoute({ route: 'ngrx-main' }));
          },
        }),
      )
      .subscribe();

    this.loading$ = this.store.select(selectLoading);
  }
}
