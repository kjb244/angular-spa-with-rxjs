import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl} from "@angular/forms";
import {TableDataService} from "../../services/table-data.service";
import {Data, FilterType, SortingMap, TableData} from "../../models/table.model";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,

})

export class TableComponent implements OnInit {
  public pageSize: number = 50;
  public totalSearchResults: number;
  public filterTypes: FilterType[];

  public tableDataMaster: TableData = {
    header: [],
    data: []
  }

  public tableDataCurr: TableData = {
    ...this.tableDataMaster
  }

  public sortingMap: SortingMap;
  public sortingClicked: boolean = false;

  public form;
  private currPage: number = 1;

  constructor(private formBuilder: FormBuilder, private tableDataService: TableDataService) {
    this.form = this.formBuilder.group({
      search: [''],
      filterType: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

    const tableDataFromService = this.tableDataService.getTableData();

    this.tableDataMaster = tableDataFromService;
    this.tableDataCurr.data = tableDataFromService.data.slice(0, this.pageSize);
    this.tableDataCurr.header = tableDataFromService.header;
    this.totalSearchResults = this.tableDataMaster.data.length;
    this.filterTypes = this.getFilteredTypes().map((e, i) =>{
      return {id: i+1 + '', value: e}
    });
    this.sortingMap = this.tableDataMaster.header.reduce((accum:SortingMap,e:string,i: number)=>{
      accum[i] = {direction: null};
      return accum;
    },{})

    this.sort(0);
    this.sortingMap[0].direction = 'ascending';

  }

  public sort(index: number){
    this.sortingClicked = !this.sortingClicked;
    const sign: number = this.sortingMap[index].direction === 'ascending'? -1 : 1;
    this.tableDataMaster.data.sort((a: Data,b: Data) =>{
      const isNum = /^\d+$/.test(a[index]+'');
      if (isNum){
        return sign * (parseInt(a[index]) - parseInt(b[index]));
      }
      return sign * (a[index]+'').localeCompare(b[index] + '');
    });
    Object.keys(this.sortingMap).forEach((e,i) =>{
      let direction = this.sortingMap[i].direction;
      if(index === i){
        direction = (direction === 'ascending' ? 'descending': 'ascending');
      } else {
        direction = null;
      }
      this.sortingMap[i].direction = direction;

    })
  }
  private getFilteredTypes(): string[] {
    const arrOfTypes = this.tableDataMaster.data.map((row: string[]) =>{
      return row[3];
    });
    const set = new Set(arrOfTypes);
    return Array.from(set).sort();
  }

  public onCheckboxChange(event: any): void{
    const filterChoices: FormArray = this.form.get('filterType') as FormArray;

    if(event.target.checked){
      filterChoices.push(new FormControl(event.target.value))
    } else {
      const index = filterChoices.controls.findIndex(x => x.value === event.target.value);
      filterChoices.removeAt(index);
    }

    this.searchAndFilter();

  }
  public getSearchValue(): string{
    return this.form.controls['search']?.value + '';
  }

  searchIt(): void{
    this.searchAndFilter();
  }

  trackByIndex = (index: number): number => {
    return index;
  };

  public onPageChange(event: number){
    this.currPage = event;
    this.searchAndFilter(true);

  }

  public getFilteredIds(): string[]{
    const filterChoices: FormArray = this.form.get('filterType') as FormArray;
    return filterChoices.controls.map((r: AbstractControl) => r.value);
  }

  private searchAndFilter(pageChange = false): void{
    const searchValue: string = this.getSearchValue();
    const currPage: number = this.currPage;
    const start: number = this.pageSize * currPage - this.pageSize;
    const end:number = start + this.pageSize;
    const filterIds: string[] = this.getFilteredIds();
    const filterTypes: string[] = this.filterTypes.filter(e => filterIds.includes(e.id)).map(e => e.value)

    const filteredResults: Data[] = this.tableDataMaster.data.filter((e: Data) =>{
      const searchResults = e.some((r: string) =>{
        return  searchValue.length ?  r.includes(searchValue) : true;
      });
      const filterResults = filterTypes.length?  filterTypes.includes(e[3]): true;
      return searchResults && filterResults;
    });
    this.totalSearchResults = filteredResults.length;
    const filteredStartEnd: Data[] = filteredResults.slice(start,end);
    const filteredZeroPageSize: Data[] = filteredResults.slice(0, this.pageSize);
    this.tableDataCurr.data = pageChange ? filteredStartEnd : filteredZeroPageSize;

  }



}
