import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoModel} from "../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) {
  }

  getListOfTodo():Observable<TodoModel[]>{
    return this.http.get<TodoModel[]>('https://myvueproject-2080c.firebaseio.com/toDo.json')
}
  addTaskToListOfTodo(task){
    return this.http.post('https://myvueproject-2080c.firebaseio.com/toDo.json',task)
  }
  deleteTaskFromListOfTodo(id){
    return this.http.delete(`https://myvueproject-2080c.firebaseio.com/toDo/${id}.json`)
  }

  // getUsers():Observable<UserModel[]>{
//     return this.http.get<UserModel[]>('https://jsonplaceholder.typicode.com/users');
//   }
}
