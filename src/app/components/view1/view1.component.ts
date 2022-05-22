import { Component, OnInit, OnDestroy } from '@angular/core';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit, OnDestroy {
  sub: any;
  formData: { [key: string]: any } = {
                                      'firstName': '',
                                      'lastName': '',
                                      'currency': ''
                                    };


  constructor(private router: Router) {
    const utils = new Utilities(router);

    this.sub = store.subscribe((state) => {
      utils.subscribeLogic(state, this.formData);
    });

  }

  ngOnInit(): void {
    eventDispatcher.next({type: Actions.GET_DATA});

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  currencyChange(currency: string){
    this.formData['currency'] = currency;
  }

}
