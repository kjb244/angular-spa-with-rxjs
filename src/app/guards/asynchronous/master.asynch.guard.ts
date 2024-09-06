import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {ContentAsynchGuard} from "./content.asynch.guard";
import {MvpAsynchGuard} from "./mvp.asynch.guard";
import {Injectable} from "@angular/core";
import {catchError, forkJoin, mergeMap, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MasterAsynchGuard implements CanActivate{

  constructor(private contentGuard: ContentAsynchGuard, private mvpGuard: MvpAsynchGuard) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const guards = [this.contentGuard.canActivate(route, state), this.mvpGuard.canActivate(route, state)];
      return forkJoin(guards).pipe(
        mergeMap((val) =>{
          console.log(val);
          return of(true);
        }),catchError(() =>{
          return of(false);
        })
      )




  }
}




