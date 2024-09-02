import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockService } from '../../services/mock.service';
import {catchError, from, mergeMap, Observable, of, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ContentAsynchGuard implements CanActivate {
  constructor(private mockService: MockService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    console.log('asynch start content')
    return from(this.mockService.getData()).pipe(
      mergeMap((e) => {
        console.log('asynch end content')
        return of(true);
      }),
      catchError(() =>{
        console.log('asynch end content exception')
        this.router.navigateByUrl('/')
        return throwError('error getting data mock service')
      })
    )
  }
}
