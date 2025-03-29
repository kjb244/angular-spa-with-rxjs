import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Selector, Store } from '@ngrx/store';
import { selectorFormMain } from '../../../ngrx-store/store.selectors';
import { FormMain } from '../../../ngrx-store/store.reducer';

@Component({
  selector: 'app-ngrx-form',
  templateUrl: './ngrx-form.component.html',
  styleUrls: ['./ngrx-form.component.css'],
})
export class NgrxFormComponent implements OnInit {
  public checkboxOptions: String[];
  public aggregateAmount: String = '';
  public feeAmount: String = '';
  public form: UntypedFormGroup;
  private formMain: FormMain;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(selectorFormMain).subscribe({
      next: (formMain: FormMain) => {
        this.formMain = formMain;
      },
    });
    this.checkboxOptions = ['checkbox 457', 'checkbox 459'];
    this.form = this.formBuilder.group({
      checkboxes: this.formBuilder.array(
        this.checkboxOptions.map(() => new UntypedFormControl(false)),
      ),
      aggregateAmount: [this.aggregateAmount],
      feeAmount: [this.feeAmount],
    });
  }

  public checkboxControls() {
    return this.form.get('checkboxes') as UntypedFormArray;
  }

  public clickMe() {
    console.log(this.form);
  }
}
