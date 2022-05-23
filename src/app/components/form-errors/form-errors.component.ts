import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css'],
})
export class FormErrorsComponent implements OnInit {


  @Input() formError: {[key: string]: any};



  constructor() { }

  ngOnInit(): void {

  }

  getFirstKey(property: any){
    return Object.keys(property.errors || {})[0];
  }




}
