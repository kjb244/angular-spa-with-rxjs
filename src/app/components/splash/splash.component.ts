import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockService } from '../../services/mock.service';
import { BeControllersService } from '../../services/be-controllers.service';
import { eventDispatcher, store } from "../../store/index";
import { Actions } from "../../store/actions";
import { Router } from '@angular/router';
import Utilities from '../../utils/utilities';
import {GetPayload} from "../../models/getpayload";
import {PostPayload} from "../../models/postpayload";



@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  sub: any;
  getPayload: GetPayload;
  postPayload: PostPayload = {formData: {}, forward: false, currRoute: ''};

  constructor(private modalService: NgbModal, private mockService: MockService,
              private beControllersService: BeControllersService,  private router: Router) {
    const utils = new Utilities(router);

    this.sub = store.subscribe((state) => {
      utils.subscribeLogic(state);
    });
  }

  ngOnInit(): void {

    //make get call
    this.beControllersService.getRouteData().subscribe((getPayload) =>{
    });
  }

  ngAfterViewInit(){
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});

    setTimeout(() =>{
      this.modalService.dismissAll();

      this.postPayload.formData = {};
      this.postPayload.currRoute = 'splash';
      this.postPayload.forward = true;

      //make post call
      this.beControllersService.postRouteData(this.postPayload).subscribe((res) =>{
        eventDispatcher.next({type: Actions.NEXT_VIEW, payload: res});
      });


    },3000);


  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
