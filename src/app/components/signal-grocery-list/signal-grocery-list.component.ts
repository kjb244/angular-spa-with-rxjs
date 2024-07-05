import { Component, inject, OnInit, signal } from '@angular/core';
import { MockService } from '../../services/mock.service';
import { of, switchMap, tap } from 'rxjs';
import { delay } from 'rxjs/operators';

interface CheckboxItem {
  item: string;
  checked: boolean;
}

@Component({
  selector: 'app-signal-grocery-list',
  templateUrl: './signal-grocery-list.component.html',
  styleUrls: ['./signal-grocery-list.component.css'],
})
export class SignalGroceryListComponent implements OnInit {
  public addItem: string;
  itemList = signal<CheckboxItem[]>([]);
  loading = signal<Boolean>(true);
  constructor(public mockService: MockService) {}

  ngOnInit() {
    of(undefined)
      .pipe(
        delay(0),
        tap(() => {
          this.loading.set(true);
        }),
        switchMap(() => this.mockService.getAddressData()),
        tap(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }

  addItemClick() {
    if (this.addItem.length) {
      const itemExists = this.itemList().some((e) => e.item === this.addItem);
      if (!itemExists) {
        this.itemList.set(
          [...this.itemList(), { item: this.addItem, checked: false }].sort(
            this.sortByChecked(),
          ),
        );
        this.addItem = '';
      }
    }
  }
  removeItem(entry: CheckboxItem) {
    this.itemList.set(this.itemList().filter((e) => e.item !== entry.item));
  }

  checkUncheckItem(entry: CheckboxItem) {
    entry.checked = !entry.checked;
    this.itemList.set(this.itemList().sort(this.sortByChecked()));
  }

  private sortByChecked() {
    return function (a: CheckboxItem, b: CheckboxItem) {
      const numComparator = Number(a.checked) - Number(b.checked);
      return numComparator === 0 ? a.item.localeCompare(b.item) : numComparator;
    };
  }
}
