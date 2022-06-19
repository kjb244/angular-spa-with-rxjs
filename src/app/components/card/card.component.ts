import {Component, Input, OnInit} from '@angular/core';
import {AccountInfo} from "../../models/state";
import {Router} from "@angular/router";
import {eventDispatcher} from "../../store/index";
import {Actions} from "../../store/actions";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() accountInfo: AccountInfo;
  @Input() accountId: Number;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickEdit(){
    eventDispatcher.next({type: Actions.EDIT_CARD, payload: {accountId: this.accountId}});
    this.router.navigateByUrl('/editcard');
  }

}
