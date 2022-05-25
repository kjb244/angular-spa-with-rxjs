import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockService } from '../../services/mock.service';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  startMs: number;
  endMs: number;
  sub: any;

  constructor(private modalService: NgbModal, private mockService: MockService, private router: Router) {
    const utils = new Utilities(router);

    this.sub = store.subscribe((state) => {
      utils.subscribeLogic(state, {});
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.startMs = new Date().getTime();
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
    this.mockService.getData().then(() =>{
      this.endMs = new Date().getTime();
      const diff = this.endMs - this.startMs;
      const threeSeconds = 1000*3;
      const moreTime = threeSeconds - diff > 0 ? threeSeconds - diff: 0;
      //add a few more seconds
      setTimeout(() =>{
        this.modalService.dismissAll();
        eventDispatcher.next({type: Actions.SPLASH_DONE});
      },moreTime);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
