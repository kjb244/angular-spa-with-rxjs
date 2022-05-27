import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetPayload} from '../models/getpayload';
import {PostPayload} from '../models/postpayload';
import {PostResponse} from '../models/postresponse';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BeControllersService {
  getUrl: string = 'http://localhost:3000/v1/getRouteData';
  postUrl: string = 'http://localhost:3000/v1/postRouteData';

  constructor(private http: HttpClient) { }

  getRouteData(): Observable<GetPayload>{
    return this.http.get<GetPayload>(this.getUrl);
  }

  postRouteData(postPayload: PostPayload){
    return this.http.post<PostPayload>(this.postUrl, postPayload, httpOptions);
  }
}
