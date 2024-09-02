import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockService } from '../../services/mock.service';
import {catchError, from, mergeMap, Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MvpSynchGuard implements CanActivate {
  constructor(
    private mockService: MockService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return from(this.mockService.getBreweryData()).pipe(
      mergeMap((e) => {
        return of(true);
      }),
      catchError(() =>{
        return of(false)
      })
    )
  }
}
