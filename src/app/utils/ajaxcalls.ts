import {BeControllersService} from "../services/be-controllers.service";
import {GetPayload} from "../models/getpayload";
import {PostPayload} from "../models/postpayload";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

class AjaxCalls {


  constructor(private beControllersService: BeControllersService, private router: Router){}

  makeGetCall(){
    return new Promise((resolve) =>{
      this.beControllersService.getRouteData().subscribe((getPayload) =>{
        resolve(getPayload);
      });
    })
  }

  makePostCall(postPayload: PostPayload){
    return new Promise((resolve) =>{

      this.beControllersService.postRouteData(postPayload).subscribe((PostResponse) =>{
        resolve(postPayload);
      });
    })
  }

  moveToNextRoute(route: string){
    this.router.navigateByUrl('/' + route);
  }

}

export default AjaxCalls;
