import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FilterSearchEnum, SearchFilter, SearchFilterSubject} from "../store/store";

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
    const mergedRecord = {...SearchFilterSubject.getValue(), [FilterSearchEnum.SEARCH]: [value]};

    SearchFilterSubject.next(mergedRecord);
  }


  searchIt(searchFilter: SearchFilter){

    this.friends = this.friendCopy.filter((personData: PersonData)=>{
      let filterAge: boolean = true;
      let search: boolean = true;
      // @ts-ignore
      const filterByAgeRecord = searchFilter[FilterSearchEnum.FILTERAGE];
      if(filterByAgeRecord){
        filterAge =  filterByAgeRecord.includes(personData.age+'');
      };
      // @ts-ignore
      const searchRecord = searchFilter[FilterSearchEnum.SEARCH];
      if(searchRecord){
        const searchString = searchRecord.join('');
        search = searchString === '' ? true : Object.keys(personData).some((key) =>{
          const value = personData[key as keyof typeof personData] + '';
          const re = new RegExp(searchString,'i');
          return re.test(value);
        });
      }

      return filterAge && search;
    });

  }



}
