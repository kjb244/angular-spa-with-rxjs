import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchFilter, SearchFilterSubject} from "../store/store";

interface PersonData {
  name: string,
  birthday: string,
  age: number
}

@Component({
  selector: 'app-search-it',
  templateUrl: './search-it.component.html',
  styleUrls: ['./search-it.component.css']
})
export class SearchItComponent implements OnInit {
  public friends: PersonData[] = [
    {name: 'john', birthday: '01/01/1990', age: 20},
    {name: 'jerry', birthday: '01/01/1993', age: 15},
    {name: 'sue', birthday: '01/01/1995', age: 25},
  ];
  public friendCopy: PersonData[] = [...this.friends];
  public form: FormGroup;
  public ages: string[];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['']
    });
    this.ages = this.friendCopy.map(rec => rec.age +'');
    SearchFilterSubject.subscribe({
      next: (value: SearchFilter) =>{
        this.searchIt(value);
      }
    })
  }

  emitSearchNext(){
    const value = this.form.controls['search'].value;
    const currentSearchRecord = SearchFilterSubject.getValue();

    SearchFilterSubject.next({...currentSearchRecord, search: value});
  }


  searchIt(searchFilter: SearchFilter){

    this.friends = this.friendCopy.filter((personData: PersonData)=>{
      let filterAge: boolean = true;
      let search: boolean = true;
      const filterByAgeRecord = searchFilter.age;
      if(filterByAgeRecord){
        filterAge =  filterByAgeRecord.includes(personData.age+'');
      };
      const searchRecord = searchFilter.search
      if(searchRecord){
        search = searchRecord === '' ? true : Object.keys(personData).some((key) =>{
          const value = personData[key as keyof typeof personData] + '';
          const re = new RegExp(searchRecord,'i');
          return re.test(value);
        });
      }

      return filterAge && search;
    });

  }



}
