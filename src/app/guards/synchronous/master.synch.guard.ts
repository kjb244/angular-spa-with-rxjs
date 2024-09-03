import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {ContentSynchGuard} from "./content.synch.guard";
import {MvpSynchGuard} from "./mvp.synch.guard";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MasterSynchGuard implements CanActivate{

  constructor(private contentGuard: ContentSynchGuard, private mvpGuard: MvpSynchGuard) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const guards = [this.contentGuard, this.mvpGuard];
    const guardsMapping = ['content guard', 'mvp guard']
    for(let i=0; i< guards.length; i++){
      console.log('about to call', guardsMapping[i])
      const result = await firstValueFrom(guards[i].canActivate(route, state));
      console.log( guardsMapping[i], 'finishing with', result)
      if(!result){
        return false;
      }
    }
    return true;
  }
}




