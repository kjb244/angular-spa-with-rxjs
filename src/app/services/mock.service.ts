import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brewery} from '../models/breweries';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  dummyData : Object[];


  constructor(private http: HttpClient) {
    const friends = ['mark','sally','june','sarah','bob'];
    this.dummyData = Array.from(Array(100).keys()).map((e) =>{
      return {
        id: e+1,
        description: 'description ' + (e + 1 + ''),
        friend: friends[Math.floor(Math.random()*5)],
      }
    })

  }

  getData(){
      const promise = new Promise((resolve) =>{
        setTimeout(() =>{
          resolve(this.dummyData);
        },700);
      });

      return promise;
  }

  getRealData(): Observable<Brewery[]>{
    return this.http.get<Brewery[]>('https://api.openbrewerydb.org/breweries');

  }
}
