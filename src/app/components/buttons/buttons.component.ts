import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import {PostPayload} from "../../models/postpayload";
import {Router} from "@angular/router";
import {BeControllersService} from "../../services/be-controllers.service";


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  @Input() formData?: { [key: string]: any };
  @Input() beforeClickActions?: () => boolean;
  showPrev: boolean = false;
  showNext: boolean = false;
  sub: any;
  postPayload: PostPayload = {formData: {}, forward: false, currRoute: ''};

  constructor(private router: Router, private beControllersService: BeControllersService) {

    this.sub = store.subscribe((state) => {
      if (state.type === Actions.GET_BUTTON_DATA){
        this.showPrev = state.showPrev;
        this.showNext = state.showNext;
      }


    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  clickButton(type: string){
    let moveForward = true;
    if(this.beforeClickActions && typeof this.beforeClickActions === 'function'){
      moveForward = this.beforeClickActions();
    }
    if(moveForward) {
      this.postPayload.formData = this.formData || {};
      this.postPayload.currRoute =  this.router.url.replace('/','');
      if (type === 'next') {
        this.postPayload.forward = true;
      } else if (type === 'prev') {
        this.postPayload.forward = false;

      }
      this.beControllersService.postRouteData(this.postPayload).subscribe((res) =>{
        eventDispatcher.next({type: Actions.NEXT_VIEW, payload: res});

      });
    }
  }

}
