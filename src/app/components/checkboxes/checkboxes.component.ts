import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css'],
})
export class CheckboxesComponent implements OnInit {
  private selectedAddressId: string = '1';
  public editedAddress: any = {
    id: null,
    addressLine1: '123 test st',
    city: 'charlotte',
    state: 'NC',
    zip: '28210',
  };

  private addressToAccounts: any = [
    {
      id: '1',
      addressLine1: '127 test st',
      city: 'charlotte',
      state: 'NC',
      zip: '28210',
      accounts: ['999', '888'],
    },
    {
      id: '2',
      addressLine1: '129 test st',
      city: 'charlotte',
      state: 'NC',
      zip: '28210',
      accounts: ['777'],
    },
  ];

  private indexToAccount: any = {};
  public formGroup: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    const checkBoxArr = new UntypedFormArray([]);
    let index = -1;
    this.addressToAccounts.forEach((e: any) => {
      if (e.id === this.selectedAddressId) {
        e.accounts.forEach((e2: any) => {
          this.indexToAccount[++index] = e2;
          checkBoxArr.push(new UntypedFormControl(true));
        });
      } else {
        e.accounts.forEach((e2: any) => {
          this.indexToAccount[++index] = e2;
          checkBoxArr.push(new UntypedFormControl(false));
        });
      }
    });
    this.formGroup = this.formBuilder.group({ entries: checkBoxArr });
  }

  getControls() {
    return (this.formGroup.get('entries') as UntypedFormArray).controls;
  }

  getSelectedAddress(i: number) {
    const account = this.indexToAccount[i];
    const { addressLine1, city, state, zip } = this.addressToAccounts.find(
      (e: any) => {
        return e.accounts.includes(account);
      },
    );
    return { addressLine1, city, state, zip };
  }

  handleCheckboxChange(event: any) {
    console.log(this.getControls());
  }
}
