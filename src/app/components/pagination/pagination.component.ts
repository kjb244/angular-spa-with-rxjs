import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl:'./pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageSize: number;
  @Input() totalRows: number;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pageData: any[] = [];



  constructor() { }

  ngOnInit(): void {
    this.determinePageData();
  }

  private determinePageData(){
    this.pageData = [];
    const pages: number = this.numberOfPages();
    for(let i=0; i<pages; i++){
      this.pageData.push({pageNumber: i+1, active: i === 0})
    }
  }

  public numberOfPages(){
    return Math.floor(this.totalRows/this.pageSize) +
      (this.totalRows % this.pageSize > 0 ? 1 : 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['totalRows'] && changes['totalRows'].previousValue){
      this.determinePageData();
    }

  }

  private getCurrPage(){
    return this.pageData.findIndex(x => x.active)
  }

  public clickPrev(){
    const currPage = this.getCurrPage();
    if (currPage - 1 >-1){
      this.pageData[currPage].active = false;
      this.pageData[currPage -1].active = true;
      this.emitPageChange();
    }
  }

  public clickNext(){
    const currPage = this.getCurrPage();
    if (currPage + 1 < this.pageData.length){
      this.pageData[currPage].active = false;
      this.pageData[currPage +1].active = true
      this.emitPageChange();
    }
  }

  public clickPageNumber(pageNumber: number){
    const currPage = this.getCurrPage();
    this.pageData[currPage].active = false;
    this.pageData[pageNumber].active = true;
    this.emitPageChange();
  }

  private emitPageChange(){
    this.onPageChange.emit(this.getCurrPage()+1);
  }

}
