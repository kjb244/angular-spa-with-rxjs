import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account, Restriction } from '../ngrx-store/store.reducer';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreMockService {
  constructor() {}

  public getRestrictions(): Observable<Restriction[]> {
    return of([
      {
        id: 1233,
        limited: true,
      },
      {
        id: 54533,
        limited: true,
      },
    ]).pipe(delay(1000));
  }

  public getAccounts(): Observable<Account[]> {
    return of([
      {
        id: 1233,
        description: 'test account',
      },
      {
        id: 3343,
        description: 'another test account',
      },
      {
        id: 54533,
        description: 'yet another test account',
      },
    ]).pipe(delay(1000));
  }
}
