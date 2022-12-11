import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-child',
  templateUrl: './simple-child.component.html',
  styleUrls: ['./simple-child.component.css']
})
export class SimpleChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public callMe(){
    console.log('call me called in simple child')
  }

}
