import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {TableDataService} from "../../services/table-data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TableComponent implements OnInit {
  public pageSize: number = 50;

  public tableDataMaster: any = {
    header: [],
    data: []
  }

  private tableDataCopy: any  = {
    ...this.tableDataMaster
  }
  public tableDataCurr: any = {
    ...this.tableDataMaster
  }

  public searchForm;

  constructor(private formBuilder: FormBuilder, private tableDataService: TableDataService) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    })
  }

  ngOnInit(): void {

    const tableDataFromService = this.tableDataService.getTableData();

    this.tableDataCopy = tableDataFromService;
    this.tableDataMaster = tableDataFromService;
    this.tableDataCurr.data = tableDataFromService.data.slice(0, this.pageSize);
    this.tableDataCurr.header = tableDataFromService.header;
  }

  public getSearchValue(){
    return this.searchForm.controls['search']?.value;
  }

  searchIt(){
    const value = this.searchForm.controls['search']?.value;
    if(value === ''){
      this.tableDataCurr.data = this.tableDataMaster.data.slice(0, this.pageSize);
    } else {
      this.tableDataCurr.data  = this.tableDataMaster.data.filter((e: any) =>{
        return e.some((r: any) =>{
          return r.includes(value);
        })
      })
    }

  }

  trackByIndex = (index: number): number => {
    return index;
  };

  public onPageChange(event: number){
    const newPage = event;
    const start = this.pageSize * newPage - this.pageSize;
    const end = start + this.pageSize;
    this.tableDataCurr.data = this.tableDataMaster.data.slice(start, end)
  }



}
