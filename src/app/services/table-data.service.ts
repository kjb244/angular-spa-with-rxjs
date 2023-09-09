import { Injectable } from '@angular/core';
import {TableData} from "../models/table.model";

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private tableData: TableData  = {
    header: ['name','date','age','types'],
    data: []
  }

  constructor() {
    for(let i=0; i<2500; i++){
      this.tableData.data.push([this.makeName(), this.makeDate(), this.makeAge(), this.makeType()])
    };
  }

  public getTableData(): TableData {
    return this.tableData;
  }

  private makeName(): string {
    const names = ['sarah','sally','john','kevin','harry','mike',
      'dylan','nathan','nat','brian','sue','baby', 'smitty','abby',
      'bianca','chris', 'kevin', 'robyn','dexter','sam'];
    return names[Math.floor(names.length * Math.random())]
  }

  private makeDate(): string {
    const dates = ['2010-01-02','2011-02-23','2020-01-01','2022-03-17','2023-02-26'];
    return dates[Math.floor(dates.length * Math.random())]
  }

  private makeAge(): string {
    const ages = ['1','2','3','4','10','11','14','15','16','18','22','45'];
    return ages[Math.floor(ages.length * Math.random())]
  }

  private makeType(): string{
    const types = ['in process','ready','complete','awaiting','almost ready','delivered'];
    return types[Math.floor(types.length * Math.random())]
  }

}
