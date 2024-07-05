import { Component, Input, OnInit } from '@angular/core';
import { SearchFilterSubject } from '../store/store';

interface CheckboxModel {
  age: string;
  checked: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() ages: string[];
  public checkBoxes: CheckboxModel[];

  constructor() {}

  ngOnInit(): void {
    this.checkBoxes = this.ages.map((age: string) => {
      return { age, checked: true };
    });
  }

  numberOfResults() {
    return this.checkBoxes.filter((e) => e.checked).length;
  }

  onCheckboxChange(index: number) {
    this.checkBoxes[index].checked = !this.checkBoxes[index].checked;
    const ageArray: string[] = this.checkBoxes
      .filter((e) => e.checked)
      .map((e) => e.age + '');
    const currentSearchRecord = SearchFilterSubject.getValue();

    SearchFilterSubject.next({ ...currentSearchRecord, age: ageArray });
  }
}
