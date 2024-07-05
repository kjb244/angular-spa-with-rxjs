import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoItem } from '../models/itinerary.models';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  public task: string = '';
  @Output() onAddTask: EventEmitter<TodoItem> = new EventEmitter();

  ngOnInit(): void {}

  public addTask() {
    this.onAddTask.emit({ id: -1, description: this.task, completed: false });
    this.task = '';
  }
}
