import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private tableData: any  = {
    header: ['name','date','age','types'],
    data: []
  }

  constructor() {
    for(let i=0; i<150; i++){
      this.tableData.data.push([this.makeName(), this.makeDate(), this.makeAge(), this.makeType()])
    };
  }

  public getTableData(): any {
    return this.tableData;
  }

  private makeName() {
    const names = ['sarah','sally','john','kevin','harry','mike',
      'dylan','nathan','nat','brian','sue','baby', 'smitty','abby',
      'bianca','chris', 'kevin', 'robyn','dexter','sam'];
    return names[Math.floor(names.length * Math.random())]
  }

  private makeDate() {
    const dates = ['2010-01-02','2011-02-23','2020-01-01','2022-03-17','2023-02-26'];
    return dates[Math.floor(dates.length * Math.random())]
  }

  private makeAge() {
    const ages = ['1','2','3','4','10','11','14','15','16','18','22','45'];
    return ages[Math.floor(ages.length * Math.random())]
  }

  private makeType(){
    const types = ['in process','ready','complete','awaiting','almost ready','delivered'];
    return types[Math.floor(types.length * Math.random())]
  }

}
