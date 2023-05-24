import { createSelector, select } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { FiltersStateInterface } from './filter.reducer';

export const selectFeature = (state: AppStateInterface) => state.filters;

export const categoryIdSelector = createSelector(
  selectFeature,
  (state: FiltersStateInterface) => state?.categoryId
);

export const sortByIdSelector = createSelector(
  selectFeature,
  (state: FiltersStateInterface) => state.sortById
);
