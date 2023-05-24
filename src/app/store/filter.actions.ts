import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Filter Component Increment');
export const decrement = createAction('[Filter Component] Decrement');
export const reset = createAction('[Filter Component] Reset');

export const setCategoryId = createAction(
  '[Filter Component] SetCategoryId',
  props<{ categoryId: number }>()
);

export const setSortById = createAction(
  '[Filter Component] SetSortById',
  props<{ sortById: number }>()
);
