import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public tableData: any  = {
    header: ['name','date','age','friend'],
    data: []
  }
  private tableDataCopy: any;

  public searchForm;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    })
  }

  ngOnInit(): void {
    for(let i=0; i<100; i++){
      this.tableData.data.push([1,2,3,4].map((e) =>{
        return this.makeId();
      }));
      this.tableDataCopy = this.tableData.data;
    }
  }

  searchIt(){
    const value = this.searchForm.controls['search']?.value;
    if(value === ''){
      this.tableData.data = this.tableDataCopy;
    } else {
      this.tableData.data  = this.tableDataCopy.filter((e: any) =>{
        return e.some((r: any) =>{
          return r.includes(value);
        })
      })
    }

  }

  trackByIndex = (index: number): number => {
    return index;
  };

  private makeId() {
    const names = ['sarah','sally','john','kevin','harry','mike',
      'dylan','nathan','nat','brian','sue','baby', 'smitty','abby',
      'bianca','chris', 'kevin', 'robyn','dexter','sam'];
    return names[Math.floor(names.length * Math.random())]
  }

}
