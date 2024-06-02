import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, forkJoin, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-ng-template-outlet',
  templateUrl: './ng-template-outlet.component.html',
  styleUrls: ['./ng-template-outlet.component.css']
})
export class NgTemplateOutletComponent implements OnInit{

  constructor(private http: HttpClient) {
  }

  public keyValueRecord: Record<string, string> = {foo: 'bar', biz: 'baz', boo: 'bear'}

  ngOnInit(): void {

    const firstCalls = forkJoin(
      [
        this.http.get('https://meowfacts.herokuapp.com/?count=1'),
        this.http.get('https://meowfacts.herokuapp.com/?count=2'),
      ])

    //first call even if doesn't succeed goes into 2nd call
    firstCalls.pipe(
      catchError(() =>{
        return of([{data:null},{data: null}])
      }),
      switchMap((firstResult: any[]) =>{
        return forkJoin({
            firstCalls: of(!firstResult[0].data ? []: [...firstResult[0].data, ...firstResult[1].data]),
            secondCalls: this.http.get('https://meowfacts.herokuapp.com/?count=3')
              .pipe(
                map((payload: any) =>{
                  return payload.data;
                })
              )

          }
        )

      })
    ).subscribe({
      next: (val) =>{
        console.log(val);
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }

}
