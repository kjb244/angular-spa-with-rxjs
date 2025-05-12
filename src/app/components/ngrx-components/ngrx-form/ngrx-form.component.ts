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
import { StoreActions } from '../../../ngrx-store/store.actions';

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
  public formStore: FormMain;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(selectorFormMain).subscribe({
      next: (formStore: FormMain) => {
        this.formStore = formStore;
        this.loadForm(formStore);
      },
    });

    this.form.valueChanges.subscribe((formChange) => {
      const formStore: FormMain = {
        ...this.formStore,
        checkboxes: this.formStore.checkboxes.map((e, i) => {
          return { ...e, checked: formChange['checkboxes'][i] };
        }),
        aggregateAmount: {
          ...this.formStore.aggregateAmount,
          value: formChange['aggregateAmount'],
        },
        feeAmount: {
          ...this.formStore.feeAmount,
          value: formChange['feeAmount'],
        },
      };
      this.store.dispatch(StoreActions.formMainChange({ form: formStore }));
    });
  }

  private loadForm(formStore: FormMain) {
    if (!this.form) {
      this.checkboxOptions = formStore.checkboxes.map((e) => e.label);

      this.form = this.formBuilder.group({
        checkboxes: this.formBuilder.array(
          this.checkboxOptions.map(() => new UntypedFormControl(false)),
        ),
        aggregateAmount: [this.aggregateAmount],
        feeAmount: [this.feeAmount],
      });
    }
  }

  public checkboxControls() {
    return this.form.get('checkboxes') as UntypedFormArray;
  }

  public clickMe() {}
}
