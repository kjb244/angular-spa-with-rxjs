import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetPayload} from '../models/getpayload';
import {PostPayload} from '../models/postpayload';
import {PostResponse} from '../models/postresponse';
import {Router} from "@angular/router";
import {of} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const routeMapping: {[key: string]: any} = {
  splash: {
    next: 'view1',
    prev: null,
    formData: {}
  },
  view1: {
    next: 'view2',
    prev: null,
    formData: {}
  },
  view2: {
    next: 'view3',
    prev: 'view1',
    formData: {}
  },
  view3: {
    next: 'view4',
    prev: 'view2',
    formData: {}
  },
  view4: {
    next: null,
    prev: 'view3',
    formData: {}
  }
};

@Injectable({
  providedIn: 'root'
})
export class BeControllersService {
  getUrl: string = 'http://localhost:3000/v1/getRouteData';
  postUrl: string = 'http://localhost:3000/v1/postRouteData';

  constructor(private http: HttpClient, private router: Router) {
  }

  getRouteData(): Observable<GetPayload> {
    if (this.isLocal()) {
      const getPayload = this.getLocalGetPayload();
      const obs: Observable<GetPayload> = of(getPayload);

      return obs;
    }
    return this.http.get<GetPayload>(this.getUrl);
  }

  postRouteData(postPayload: PostPayload) {
    if (this.isLocal()) {
      const nextRouteObj = this.getLocalNextRoute(postPayload);
      const obs: Observable<Object> = of(nextRouteObj);
      return obs;

    }
    return this.http.post<PostPayload>(this.postUrl, postPayload, httpOptions);
  }

  private isLocal(): boolean {
    return document.cookie.includes('mock=true');
  }

  private getLocalNextRoute(postPayload: PostPayload) : object {
    const {formData, currRoute, forward} = postPayload;
    const routeMappingInner = routeMapping[currRoute] || {};
    const nextRoute = forward == true ? routeMappingInner.next : routeMappingInner.prev;
    routeMappingInner.formData = formData;
    return {nextRoute: nextRoute};

  }

  private getLocalGetPayload() : GetPayload{
    const currRoute = this.router.url.replace('/','');
    const routeMappingInner = routeMapping[currRoute] || {};
    return {
      formData: routeMappingInner.formData,
      showNext: !!(routeMappingInner.next || '').length,
      showPrev: !!(routeMappingInner.prev || '').length
    }
  }
}
