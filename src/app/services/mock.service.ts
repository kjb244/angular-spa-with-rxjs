import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  dummyData : Object[] = [
    {
      id: 1,
      description: 'testing 1',
    },
    {
      id: 2,
      description: 'testing 2',
    },
  ];


  constructor() { }

  getData(){
      const promise = new Promise((resolve) =>{
        setTimeout(() =>{
          resolve(this.dummyData);
        },700);
      });

      return promise;

  }
}
