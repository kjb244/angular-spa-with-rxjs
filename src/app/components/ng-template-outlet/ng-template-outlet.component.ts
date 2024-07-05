import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, of, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-ng-template-outlet',
  templateUrl: './ng-template-outlet.component.html',
  styleUrls: ['./ng-template-outlet.component.css'],
})
export class NgTemplateOutletComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public keyValueRecord: Record<string, string> = {
    foo: 'bar',
    biz: 'baz',
    boo: 'bear',
  };

  ngOnInit(): void {
    //zip is like promise all settled
    const firstCalls = zip([
      this.http.get('https://meowfacts.herokuapp.com/?count=1').pipe(
        catchError(() => {
          return of({ data: [] });
        }),
      ),
      this.http.get('https://meowfacts.herokuapp.com/?count=2').pipe(
        catchError(() => {
          return of({ data: [] });
        }),
      ),
    ]);

    //first call even if doesn't succeed goes into 2nd call
    firstCalls
      .pipe(
        switchMap((firstResult: any[]) => {
          return forkJoin([
            of([...firstResult[0].data, ...firstResult[1].data]),
            this.http.get('https://meowfacts.herokuapp.com/?count=3').pipe(
              map((payload: any) => {
                return payload.data;
              }),
            ),
          ]);
        }),
        map((payload: any[]) => {
          return [...payload[0], ...payload[1]];
        }),
      )
      .subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
