import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockService } from '../../services/mock.service';
import { catchError, from, mergeMap, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MvpAsynchGuard implements CanActivate {
  constructor(
    private mockService: MockService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    console.log('asynch start mvp');

    return from(this.mockService.getBreweryData()).pipe(
      mergeMap((e) => {
        console.log('asynch end mvp');
        return of(true);
      }),
      catchError(() => {
        console.log('asynch end mvp exception');
        this.router.navigateByUrl('/');
        return throwError('error getting data from brewery');
      }),
    );
  }
}
