import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MockService } from '../../services/mock.service';
import * as _ from 'underscore';
import { debounceTime, filter, mergeMap } from 'rxjs';
import { FlowPageComponent } from '../flow-page/flow-page.component';

interface AddressData {
  addressString: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  selector: 'app-view7',
  templateUrl: './view7.component.html',
  styleUrls: ['./view7.component.css'],
})
export class View7Component extends FlowPageComponent implements OnInit {
  public overrideFaqs: string[] = ['override 1', 'override 2'];
  showContainer: boolean = true;
  search: string = '';
  line1: string = '';
  line2: string = '';
  city: string = '';
  state: string = '';
  stateList: string[] = ['AK', 'AR'];
  zip: string = '';
  addressData: AddressData[] = [];
  view7Form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private mockService: MockService,
  ) {
    super();
    this.defaultFaqs = ['override 1', 'override 2'];
    this.view7Form = formBuilder.group({
      search: [this.search],
      line1: [this.line1],
      line2: [this.line2],
      city: [this.city],
      state: [this.state],
      zip: [this.zip],
      checkMe: [true],
    });
  }

  override ngOnInit(): void {
    this.view7Form.controls['search'].valueChanges
      .pipe(
        debounceTime(200),
        filter((value: string) => {
          if (value.length <= 3) {
            this.addressData = [];
          }
          return value.length > 3;
        }),
        mergeMap(() => this.mockService.getAddressData()),
      )
      .subscribe({
        next: (payload: any) => {
          payload = _.shuffle(payload);
          this.addressData = payload.reduce((accum: AddressData[], e: any) => {
            const obj: AddressData = {
              line1: '',
              city: '',
              state: '',
              zip: '',
              addressString: '',
            };
            const { line1, city, state, zip } = e;
            obj.addressString = `${line1} ${city} ${state} ${zip}`;
            obj.line1 = line1;
            obj.city = city;
            obj.state = state;
            obj.zip = zip;
            accum.push(obj);
            return accum;
          }, []);
        },
      });
  }
  get checkMe() {
    return this.view7Form.get('checkMe');
  }

  focusOut(): void {
    setTimeout(() => {
      this.showContainer = false;
    }, 100);
  }

  focusIn(): void {
    this.showContainer = true;
  }

  clickAddress(i: number) {
    console.log(i);
  }

  searchIt(): void {}
}
