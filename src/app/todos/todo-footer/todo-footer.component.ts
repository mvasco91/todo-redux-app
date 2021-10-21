import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as filterActions from '../../filter/filter.actions';
import * as todoActions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  currentFilter: filterActions.validFilters = 'All';
  filters: filterActions.validFilters[] = ['All', 'Completed', 'Active'];

  pendings: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.pendings = state.todos.filter(todo => !todo.completed).length;
    })
  }

  changeFilter(filter: filterActions.validFilters) {
    this.store.dispatch(filterActions.setFilter({filter}));
  }

  clearCompleted() {
    this.store.dispatch(todoActions.deleteTodosCompleted())
  }
}
