import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { createTodo, editTodo, toggle, deleteTodo, toggleAll, deleteTodosCompleted } from './todo.actions';

export const initialState: Todo[] = [];

const _todoReducer = createReducer(initialState,
  on(createTodo, (state, {text}) => [...state, new Todo(text)]),
  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      } else {
        return todo;
      }
    });
  }),
  on(editTodo, (state, {id, text}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          text: text
        }
      } else {
        return todo;
      }
    });
  }),
  on(deleteTodo, (state, {id})=> state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, {completed}) => {
    return state.map(todo => {
        return {
          ...todo,
          completed: completed
        }
    });
  }),

  on(deleteTodosCompleted, (state) => state.filter(todo => !todo.completed)),
);


export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
