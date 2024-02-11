import { Component } from '@angular/core';
import {TodoItem} from "../models/itinerary.models";


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  public todoItems: TodoItem[] = [
    {id: 0 ,description: 'visit museum', completed: true},
    {id: 1, description: 'visit bar', completed: false}

  ]

  public addTask(e: TodoItem){
    const idToChange = this.todoItems.sort((a,b) =>{
      return -1 *  (a.id - b.id)
    })[0].id;
    this.todoItems = [...this.todoItems, {...e, id: idToChange+1}]
  }

  public editTask(e: TodoItem){
    const item = this.todoItems.find(r => r.id === e.id);
    if(item){
      item.description = e.description;
      item.completed = e.completed;
    }

  }

}
