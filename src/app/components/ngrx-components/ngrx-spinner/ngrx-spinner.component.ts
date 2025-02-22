import { Component, OnInit } from '@angular/core';
import { filter, Observable, of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActionsSubject, Store } from '@ngrx/store';
import { StoreActions } from '../../../ngrx-store/store.actions';
import { selectLoading } from '../../../ngrx-store/store.reducer';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-ngrx-spinner',
  templateUrl: './ngrx-spinner.component.html',
  styleUrls: ['./ngrx-spinner.component.css'],
})
export class NgrxSpinnerComponent implements OnInit {
  public loading$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(StoreActions.getCoreData());
  }
}
