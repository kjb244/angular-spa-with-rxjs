import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private tableData: any  = {
    header: ['name','date','age','friend'],
    data: []
  }

  constructor() {
    for(let i=0; i<150; i++){
      this.tableData.data.push([1,2,3,4].map((e) =>{
        return i+1 + '' + this.makeId();
      }));
    }
  }

  public getTableData(): any {
    return this.tableData;
  }

  private makeId() {
    const names = ['sarah','sally','john','kevin','harry','mike',
      'dylan','nathan','nat','brian','sue','baby', 'smitty','abby',
      'bianca','chris', 'kevin', 'robyn','dexter','sam'];
    return names[Math.floor(names.length * Math.random())]
  }

}
