import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {TodoModel} from '../../models/todo.model';

@Component({
  selector: 'app-full-todo-list',
  templateUrl: './full-todo-list.component.html',
  styleUrls: ['./full-todo-list.component.css']
})
export class FullTodoListComponent implements OnInit {
  todoList: TodoModel[] = [
    {id: 1, todo: {task: 'make coffee', description: 'wake up and make coffe'}},
    {id: 2, todo: {task: 'make coffee', description: 'wake up and make coffe'}},
    {id: 3, todo: {task: 'make coffee', description: 'wake up and make coffe'}},
    {id: 4, todo: {task: 'make coffee', description: 'wake up and make coffe'}},
    {id: 5, todo: {task: 'make coffee', description: 'wake up and make coffe'}},
    ];

  getList(): TodoModel[]{
    return this.todoList;
  }

  constructor(private todoService: TodoService) {
     this.todoService.getListOfTodo().subscribe(todo => {
       // tslint:disable-next-line:forin
      for (const value in todo) {
        // @ts-ignore
        this.todoList.push({todo: todo[value], id: value});
      }
    });
  }
   delete(id): void{
     this.todoService.deleteTaskFromListOfTodo(id).subscribe(value => value, error => console.log(error));
     this.todoList.splice(this.todoList.findIndex(value => value.id === id), 1);
   }
  ngOnInit(): void {
  }
}
