import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brewery} from '../models/breweries';
import {of} from "rxjs";
import {delay} from "rxjs/operators";

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

  getBreweryData(): Observable<Brewery[]>{
    return this.http.get<Brewery[]>('https://api.openbrewerydb.org/breweries');

  }


  getAddressData(): Observable<any[]>{
    const payload = [
      {
        line1: '112 kitley pl',
        city: 'charlotte',
        state: 'NC',
        zip: '28210'
      },
      {
        line1: '112 kitley st',
        city: 'charlotte',
        state: 'NC',
        zip: '28210'
      },
      {
        line1: '1120 kitley st',
        city: 'charlotte',
        state: 'NC',
        zip: '28210'
      },
      {
        line1: '112 cooper st',
        city: 'test town',
        state: 'PA',
        zip: '19311'
      },
    ];
    const obs: Observable<any[]> = of(payload).pipe(delay(1000));
    return obs;
  }
}
