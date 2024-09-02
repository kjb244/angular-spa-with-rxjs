import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockService } from '../../services/mock.service';
import {catchError, from, mergeMap, Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ContentSynchGuard implements CanActivate {
  constructor(private mockService: MockService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return from(this.mockService.getData()).pipe(
      mergeMap((e) => {
        return of(true);
      }),
      catchError((err) =>{
        this.router.navigateByUrl('/')
        return of(false);
      })
    )
  }
}
