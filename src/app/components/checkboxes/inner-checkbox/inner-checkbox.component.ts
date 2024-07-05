import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddressformatterPipe } from '../../../pipes/addressformatter.pipe';

@Component({
  selector: 'app-inner-checkbox',
  templateUrl: './inner-checkbox.component.html',
  styleUrls: ['./inner-checkbox.component.css'],
})
export class InnerCheckboxComponent implements OnInit {
  @Input() editedAddress: any;
  @Input() selectedAddress: any;
  @Input() control: any;
  @Input() index: number;
  @Output() onCheckboxChange: EventEmitter<string> = new EventEmitter();
  public addressToShow: any;

  constructor() {}

  ngOnInit(): void {
    this.addressToShow = this.control.value
      ? this.editedAddress
      : this.selectedAddress;
  }

  checkboxChange(event: any) {
    this.onCheckboxChange.emit('');
    const checked = event.target.checked;
    this.addressToShow = checked ? this.editedAddress : this.selectedAddress;
  }
}
