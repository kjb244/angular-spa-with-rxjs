import { Component, OnInit } from '@angular/core';
import {MockService} from "../../services/mock.service";
import {Brewery} from '../../models/breweries';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

interface Breweries{
  name: string;
  state: string;
  shown: boolean;
}

@Component({
  selector: 'app-view6',
  templateUrl: './view6.component.html',
  styleUrls: ['./view6.component.css']
})
export class View6Component implements OnInit {

  breweries: Breweries[] = [];
  search: string = '';
  view6Form: FormGroup;

  constructor(private mockService: MockService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mockService.getRealData().subscribe((payload: Brewery[]) =>{
      this.breweries = payload.slice(0,20).map((e:Brewery) =>{
        return {
          name: e.name,
          state: e.state,
          shown: true
        }
      })
    });
    this.view6Form = this.formBuilder.group({
      "search": [this.search]
    })
  }

  searchIt(){
    const value:string = this.view6Form.value.search.toLowerCase();
    this.breweries = this.breweries.map((e: Breweries)=>{
        const found: boolean = e.name.toLocaleLowerCase().includes(value) || e.state.toLowerCase().includes(value);
        return {...e, shown: found};
      })
  }

}
