import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account, Restriction } from '../../../ngrx-store/store.reducer';
import { Observable } from 'rxjs';
import { StoreActions } from '../../../ngrx-store/store.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  selectorAccounts,
  selectorRestrictions,
} from '../../../ngrx-store/store.selectors';

@Component({
  selector: 'app-ngrx-main',
  templateUrl: './ngrx-main.component.html',
  styleUrls: ['./ngrx-main.component.css'],
})
export class NgrxMainComponent implements OnInit {
  public accounts$: Observable<Account[]>;
  private restrictions: Restriction[] = [];
  constructor(
    private store: Store,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.accounts$ = this.store.select(selectorAccounts);
    this.store.select(selectorRestrictions).subscribe({
      next: (restrictions: Restriction[]) => {
        this.restrictions = restrictions;
      },
    });
  }

  public hasRestriction(accountId: number) {
    return this.restrictions.some((r) => r.id === accountId && r.limited);
  }

  public openModal(content: TemplateRef<any>, accountId: number) {
    this.modalService.open(content).result.then(
      () => {
        this.store.dispatch(StoreActions.removeRestriction({ id: accountId }));
      },
      (dismissedReason) => {
        console.log(dismissedReason);
      },
    );
  }
}
