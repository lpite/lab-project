import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, async, take } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { setCategoryId, setSortById } from '../store/filter.actions';
import {
  categoryIdSelector,
  sortByIdSelector,
} from '../store/filter.selectors';
import { AppStateInterface } from '../types/appState.interface';

@Component({
  selector: 'app-filters-block',
  templateUrl: './filters-block.component.html',
  styleUrls: ['./filters-block.component.scss'],
})
export class FiltersBlockComponent implements OnInit {
  categoryId!: number;
  sortById!: number;
  isOpenSortingPopup = false;
  categories = ['Всі', "М'ясні", 'Вегетарианські', 'Гриль', 'Гострі'];
  sortBy = ['популярності', 'ціні', 'алфавіту'];

  constructor(private store: Store<AppStateInterface>) {}
  ngOnInit(): void {
    this.store.select(categoryIdSelector).subscribe((id) => {
      this.categoryId = id;
    });
    this.store.select(sortByIdSelector).subscribe((id) => {
      this.sortById = id;
    });
  }

  setCategoryId(categoryId: number) {
    this.store.dispatch(setCategoryId({ categoryId }));
  }
  setSortById(sortById: number) {
    this.store.dispatch(setSortById({ sortById }));
  }
  toggleSortingPopup() {
    this.isOpenSortingPopup = !this.isOpenSortingPopup;
  }
  closeSortingPopup() {
    this.isOpenSortingPopup = false;
  }
  @HostListener('window:click', ['$event'])
  onClick(event: any) {
    const path = event.path || (event.composedPath && event.composedPath());
    const isPopup = Boolean(path.find((el: any) => el?.className !== 'sort'));
    const isPopupLabel = event?.target?.parentElement?.className === 'sort__label';

    if (this.isOpenSortingPopup && isPopup && !isPopupLabel) {
      this.closeSortingPopup();
    }
  
  }
}
