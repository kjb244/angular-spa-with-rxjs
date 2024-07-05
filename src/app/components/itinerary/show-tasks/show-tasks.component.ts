import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TodoItem } from '../models/itinerary.models';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit, OnChanges {
  @Input() tasks: TodoItem[];
  @Output() onEditTask: EventEmitter<TodoItem> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<number> = new EventEmitter();
  public tasksModel: TodoItem[];

  public editings: boolean[];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.editings = this.tasks.map((e) => false);
    //since this is an object being passed angular will update parent with any change; so clone it
    //and let emit notify when changes made
    this.tasksModel = _.cloneDeep(this.tasks);
  }

  public editingClicked(i: number) {
    this.editings[i] = true;
  }

  public editingCheckbox(i: number) {
    //don't update the description (only cb); so use this.tasks[i]
    this.onEditTask.emit({
      ...this.tasks[i],
      completed: !this.tasks[i].completed,
    });
  }

  public saveClicked(i: number) {
    this.editings[i] = false;
    //don't update the cb; so use this.tasks[i]
    this.onEditTask.emit({
      ...this.tasks[i],
      description: this.tasksModel[i].description,
    });
  }

  public deleteClicked(i: number) {
    this.onDeleteTask.emit(this.tasksModel[i].id);
  }
}
