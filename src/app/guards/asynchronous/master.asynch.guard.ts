import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {ContentAsynchGuard} from "./content.asynch.guard";
import {MvpAsynchGuard} from "./mvp.asynch.guard";
import {Injectable} from "@angular/core";
import {combineLatest, forkJoin, merge, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MasterAsynchGuard implements CanActivate{

  constructor(private contentGuard: ContentAsynchGuard, private mvpGuard: MvpAsynchGuard) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const guards = [this.contentGuard.canActivate(route, state), this.mvpGuard.canActivate(route, state)];
    return new Promise((resolve) =>{
      forkJoin(guards)
        .subscribe({
        next: ((val: boolean[]) =>{
          console.log(val);
          resolve(true);
        }),
        error: ((err) =>{
          console.log(err)
          resolve(false);
        })
      })
    })



  }
}




