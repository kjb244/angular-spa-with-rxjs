import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';
import {NgForm} from "@angular/forms";
import {BeControllersService} from "../../services/be-controllers.service";
import {GetPayload} from "../../models/getpayload";


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
                                      'currency': '',
                                      'currencyWithDirective': '',
                                    };


  constructor(private router: Router, private beControllersService: BeControllersService) {
    const utils = new Utilities(router);

    this.sub = store.subscribe((state) => {
      utils.subscribeLogic(state, this.formData);
    });

  }

  ngOnInit(): void {
    this.beControllersService.getRouteData().subscribe((getPayload: GetPayload) =>{
      eventDispatcher.next({type: Actions.GET_DATA, payload: getPayload});
      eventDispatcher.next({type: Actions.GET_BUTTON_DATA});
    });


  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  //TODO possible write directive to handle currency
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
