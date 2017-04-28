import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import { TodoItem } from './todoitem';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  todos: Array<TodoItem>;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
    this.todos = new Array<TodoItem>();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.populateTodoList(names),
        error => this.errorMessage = <any>error
      );
    console.log(this.names)
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.todos.push(new TodoItem(this.newName, false));
    this.newName = '';
    return false;
  }

  setCompleted(todo: TodoItem, checked: boolean) {
    todo.done = checked;
  }

  removeTodo(todo: TodoItem) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }

  populateTodoList(names: string[]) {
    console.log(names)
    this.todos = new Array<TodoItem>();
    for (var name of names) {
      this.todos.push(new TodoItem(name, false));
    }
  }

}
