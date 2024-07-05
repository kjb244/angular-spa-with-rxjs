import { Component } from '@angular/core';
import { TodoItem } from '../models/itinerary.models';

@Component({
  selector: 'app-base-itinerary',
  templateUrl: './base-itinerary.component.html',
  styleUrls: ['./base-itinerary.component.css'],
})
export class BaseItineraryComponent {
  public todoItems: TodoItem[] = [
    { id: 0, description: 'visit museum', completed: true },
    { id: 1, description: 'visit bar', completed: false },
  ];

  public addTask(e: TodoItem) {
    const idToChange = this.todoItems.sort((a, b) => {
      return -1 * (a.id - b.id);
    })[0].id;
    this.todoItems = [...this.todoItems, { ...e, id: idToChange + 1 }];
  }

  public editTask(e: TodoItem) {
    const item = this.todoItems.find((r) => r.id === e.id);
    if (item) {
      item.description = e.description;
      item.completed = e.completed;
    }
  }

  public deleteTask(id: number) {
    this.todoItems = this.todoItems.filter((e) => e.id !== id);
  }
}
