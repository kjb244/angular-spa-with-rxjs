import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-page',
  templateUrl: './flow-page.component.html',
  styleUrls: ['./flow-page.component.css']
})
export class FlowPageComponent implements OnInit {
  public defaultFaqs: string[] = ['default 1', 'default 2'];
  constructor() { }

  ngOnInit(): void {
  }

}
