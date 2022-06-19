import {Component, OnDestroy, OnInit} from '@angular/core';
import {eventDispatcher, store} from "../../store/index";
import {AccountInfo} from '../../models/state';
import {Actions} from "../../store/actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view5',
  templateUrl: './view5.component.html',
  styleUrls: ['./view5.component.css']
})
export class View5Component implements OnInit, OnDestroy {

  sub: any;
  accounts: AccountInfo[];

  constructor(private router: Router) {
    this.sub = store.subscribe(e =>{
      this.accounts = e.accounts;
    });

  }

  ngOnInit(): void {

    eventDispatcher.next({type: Actions.GET_ACCOUNT_INFO});

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  clickButton(type: string){
    if(type === 'prev'){
      this.router.navigateByUrl('/view4');
    }
  }

}
