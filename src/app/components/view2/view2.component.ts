import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {eventDispatcher, store} from "../../store/index";
import {Actions} from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';
import {BeControllersService} from "../../services/be-controllers.service";
import {GetPayload} from "../../models/getpayload";




@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit, OnDestroy {

  sub: any;
  formData: { [key: string]: any } = {
    'friend': '',
    'friends': [],
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

  clickAddFriend(){
    this.formData['friends'].push(this.formData['friend']);
    this.formData['friend'] = '';
  }

  closeAlert(index: number){
    this.formData['friends'].splice(index,1);
  }

}
