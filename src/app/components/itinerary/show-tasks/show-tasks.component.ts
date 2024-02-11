import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TodoItem} from "../models/itinerary.models";

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit, OnChanges {

  @Input() tasks: TodoItem[];
  @Output() onEditTask: EventEmitter<TodoItem> = new EventEmitter();

  public descriptions: string[];
  public editings: boolean[];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.descriptions = this.tasks.map(e => e.description);
    this.editings = this.tasks.map(e => false);
  }

  public editingClicked(i: number){
    this.editings[i] = true;
  }

  public editingCheckbox(i: number){
    this.onEditTask.emit({...this.tasks[i], completed: !this.tasks[i].completed});
  }

  public saveClicked(i: number){
    this.editings[i] = false;
    this.onEditTask.emit({...this.tasks[i], description: this.descriptions[i]});

  }



}
