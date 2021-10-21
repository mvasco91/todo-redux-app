import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputRef') txtInputRef!: ElementRef;

  chkCompleted!: FormControl;
  txtInput!: FormControl;

  editing: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompleted.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id: this.todo.id}))
    })
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.txtInputRef.nativeElement.select();
    }, 1);
  }

  saveEdition() {
    this.editing = false;
    if(this.txtInput.invalid){return}
    if(this.txtInput.value === this.todo.text){return}
    this.store.dispatch(actions.editTodo({id: this.todo.id, text: this.txtInput.value}))
  }

  delete() {
    this.store.dispatch(actions.deleteTodo({id: this.todo.id}));
  }

}
