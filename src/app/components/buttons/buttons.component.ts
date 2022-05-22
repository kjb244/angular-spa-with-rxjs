import { Component, OnInit, Input } from '@angular/core';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Input() formData: { [key: string]: any };
  showPrev: boolean = false;
  showNext: boolean = false;

  constructor() {
    store.subscribe((state) => {
      const { currRoute, routeMapping, type } = state;
      if(type === Actions.GET_DATA){
        if(currRoute && routeMapping[currRoute].next){
          this.showNext = true;
        }
        if (currRoute && routeMapping[currRoute].prev){
          this.showPrev = true;
        }
      }


    });
  }

  ngOnInit(): void {
    eventDispatcher.next({type: Actions.GET_DATA});

  }

  clickButton(type: string){
    if(type === 'next'){
      eventDispatcher.next({type: Actions.CLICK_NEXT, payload: this.formData});
    } else if (type === 'prev'){
      eventDispatcher.next({type: Actions.CLICK_PREVIOUS, payload: this.formData});
    }
  }

}
