import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { selectTotalCount, selectTotalPrice } from '../store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalPrice: number = 0;
  totalCount:number = 0;
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.select(selectTotalPrice).subscribe((totalPrice)=>{
      this.totalPrice = totalPrice;
    });
    this.store.select(selectTotalCount).subscribe((totalCount)=>{
      this.totalCount = totalCount;
    });
  }
}
