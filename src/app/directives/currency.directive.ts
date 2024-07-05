import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrency]',
})
export class CurrencyDirective {
  constructor(
    private element: ElementRef,
    private ngControl: NgControl,
  ) {}

  @HostListener('input', ['$event']) onInputHandler(event: any) {
    const value = event.target.value;
    this.element.nativeElement.value = this.makeItCurrency(value) || '';
    if (
      this.ngControl &&
      this.ngControl.control &&
      this.ngControl.control.patchValue
    )
      this.ngControl.control.patchValue(this.element.nativeElement.value);
  }

  makeItCurrency(str: string) {
    let rtnStr = str.replace(/[^0-9]+/g, '');
    rtnStr = rtnStr
      .split('')
      .reverse()
      .map((e, i) => {
        if (i > 0 && i % 3 === 0) {
          return e + ',';
        }
        return e;
      })
      .reverse()
      .join('');
    if (rtnStr.length) {
      return '$' + rtnStr;
    }
    return '';
  }
}
