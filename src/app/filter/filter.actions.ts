import { createAction, props } from "@ngrx/store";

export type validFilters = 'All' | 'Completed' | 'Active';
export const setFilter = createAction('[Filter] Set Filter', props<{filter: validFilters}>());
