import { createReducer, on } from '@ngrx/store';
import { setCategoryId, setSortById } from './filter.actions';

export interface FiltersStateInterface {
  categoryId: number;
  sortById: number;
}

export const initialState: FiltersStateInterface = {
  categoryId: 0,
  sortById: 0,
};

export const filterReducer = createReducer(
  initialState,
  on(setCategoryId, (state, { categoryId }) => ({
    ...state,
    categoryId: categoryId,
  })),
  on(setSortById, (state, { sortById }) => ({
    ...state,
    sortById: sortById,
  }))
);
