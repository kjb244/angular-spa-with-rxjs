import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit, OnDestroy {
  sub: any;
  @ViewChild('contactForm') contactForm: NgForm;


  //TODO: make this object[]
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

  checkFormValidity = () =>{
    const controls = this.contactForm.controls;
    Object.keys(controls).forEach((e) =>{
      controls[e].markAsTouched();
    });

    return this.contactForm.valid || false;

  }

}
