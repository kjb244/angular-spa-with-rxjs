import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormMain } from '../ngrx-store/store.reducer';

@Injectable({
  providedIn: 'root',
})
export class RulesEngineService {
  constructor() {}

  public updateForm(form: FormMain): Observable<FormMain> {
    let error = null;
    let helpTextAgg = '';
    let helpTextFee = '';
    let errorMessageAgg = '';
    let errorMessageFee = '';
    const aggAmt: Number = parseFloat(
      form.aggregateAmount.value.replace(/[^0-9]+/g, '') || '0',
    );
    if (form.checkboxes.every((e) => e.checked)) {
      error = 'both checked';
      helpTextAgg = 'both';
      helpTextFee = 'both';
    } else if (form.checkboxes[0].checked) {
      error = 'error 1';
      helpTextAgg = 'help 1';
      helpTextFee = 'help 2';
      if (aggAmt < 9999) {
        errorMessageAgg = 'needs to be greater than $9,999';
      }
    } else if (form.checkboxes[1].checked) {
      error = 'error 2';
      helpTextAgg = 'help 2';
      helpTextFee = 'help 2';
      if (aggAmt > 9999) {
        errorMessageAgg = 'needs to be less than $9,999';
      }
    }
    return of({
      ...form,
      error,
      aggregateAmount: {
        ...form.aggregateAmount,
        help: helpTextAgg,
        errorMessage: errorMessageAgg,
      },
      feeAmount: {
        ...form.feeAmount,
        help: helpTextFee,
      },
    });
  }
}
