import { Component, OnInit } from '@angular/core';
import { MockService } from '../../services/mock.service';
import {eventDispatcher, store} from "../../store/index";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';
import {Actions} from "../../store/actions";
import {GetPayload} from "../../models/getpayload";
import {BeControllersService} from "../../services/be-controllers.service";



@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {

  data: {id: number, description: string, friend: string}[];
  filteredData: {id: number, description: string, friend: string, show: boolean}[] = [];
  paginationRows: number = 10;
  links: number[];
  currentView: number;
  search: string = '';
  sub: any;
  showSpinner: boolean = true;

  constructor(private mockService: MockService, private router: Router, private beControllersService: BeControllersService) {
    const utils = new Utilities(router);
    this.sub = store.subscribe((state) => {
      utils.subscribeLogic(state, {});
    });
  }

  ngOnInit(): void {
    this.mockService.getData().then((payload: any) =>{
      this.showSpinner = false;
      this.data = payload;
      const maxLink = Math.ceil(this.data.length/this.paginationRows);
      this.links = Array.from(Array(maxLink).keys());
      this.currentView = 1;
      this.filteredData = this.filterData(this.currentView);
    });

    this.beControllersService.getRouteData().subscribe((getPayload: GetPayload) =>{
      eventDispatcher.next({type: Actions.GET_DATA, payload: getPayload});
      eventDispatcher.next({type: Actions.GET_BUTTON_DATA});
    });


  }

  filterData(currView: number){
    let start = 1;
    if(currView > 1){
      start = (currView - 1) * 10 + 1;
    }
    const end = start + this.paginationRows - 1;
    return this.data.filter((e,i) =>{
      const row = i+1;
      return (row >= start && row <= end);
    }).map((e) =>{
      return {...e, show: true}
    });
  }

  clickLink(index: number){
    const viewClicked = index+1;
    this.currentView = viewClicked;
    this.filteredData = this.filterData(this.currentView);
    this.search = '';

  }

  searchIt(event: any){
    this.filteredData = this.filteredData.map((e) => {
      const show =  (e.description.includes(this.search) || e.friend.includes(this.search));
      return {...e, show}
    })
  }

}
