import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MockService} from "../../services/mock.service";
import * as _ from 'underscore';
import {StringmatcherPipe} from '../../pipes/stringmatcher.pipe';

interface AddressData{
  addressString: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
}


@Component({
  selector: 'app-view7',
  templateUrl: './view7.component.html',
  styleUrls: ['./view7.component.css']
})


export class View7Component implements OnInit {
  showContainer: boolean = true;
  search: string = '';
  line1: string = '';
  line2: string = '';
  city: string = '';
  state: string = '';
  stateList: string[] = ['AK','AR'];
  zip: string = '';
  addressData: AddressData[] = [];
  view7Form: FormGroup;

  constructor(private formBuilder: FormBuilder, private mockService: MockService) {
    this.view7Form = formBuilder.group({
      'search': [this.search],
      'line1': [this.line1],
      'line2': [this.line2],
      'city': [this.city],
      'state': [this.state],
      'zip': [this.zip],
      'checkMe': [true]
    })
  }

  ngOnInit(): void {

  }
  get checkMe() {
    return this.view7Form.get("checkMe");
  }

  focusOut(): void{
    setTimeout(() =>{
      this.showContainer = false;
    },100);
  }

  focusIn(): void{
    this.showContainer = true;
  }

  clickAddress(i: number){
    console.log(i);
  }

  searchIt(): void {
    const searchValue = this.view7Form.value.search;
    this.mockService.getAddressData().subscribe((payload) =>{
      payload = _.shuffle(payload);
      this.addressData = payload.reduce((accum: AddressData[], e: any) =>{
        const obj:AddressData = {line1: '', city: '', state: '', zip: '', addressString: ''};
        const {line1, city, state, zip} = e;
        obj.addressString =  `${line1} ${city} ${state} ${zip}`;
        obj.line1 = line1;
        obj.city = city;
        obj.state = state;
        obj.zip = zip;
        accum.push(obj);
        return accum;

      },[]);


    })

  }

}
