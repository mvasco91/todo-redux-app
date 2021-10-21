import { createReducer, Action, on } from '@ngrx/store';
import { setFilter, validFilters } from './filter.actions';


const initialState: validFilters = 'All';

const _filterReducer = createReducer<validFilters, Action>(
  initialState,
  on(setFilter, (state, {filter}) => filter),
);
export function filterReducer(state: any, action: Action) {
  return _filterReducer(state, action);
}
