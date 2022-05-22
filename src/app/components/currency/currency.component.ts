import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency',
  template: `<label for="currency">Enter Amount</label>
            <input type="text" 
            [(ngModel)]="amount"
            (input)="inputEvent($event)" 
            name="currency"
            id="currency"
            class="form-control"/>`,
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  @Input() amount: any = '';
  @Output() onCurrencyChange: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    this.amount = this.makeItCurrency(this.amount + '');
  }

  inputEvent(event: any){
    const value = event.target.value;
    const newValue = this.makeItCurrency(value);
    event.target.value =  newValue;
    this.onCurrencyChange.emit(newValue);


  }

  makeItCurrency(str: string){
    let rtnStr = str.replace(/[^0-9]+/g,'');
    rtnStr = rtnStr.split('').reverse().map((e,i) =>{
      if(i>0 && i%3 === 0){
        return e + ','
      }
      return e;
    }).reverse().join('');
    if(rtnStr.length){
      return '$' + rtnStr;
    }
    return '';
  }

}
