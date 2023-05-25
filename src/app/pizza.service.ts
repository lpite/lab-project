import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pizza } from './types/Pizza';

@Injectable({ providedIn: 'root' })
export class PizzaService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getPizzas({
    categoryId,
    sortById,
  }: {
    categoryId: number;
    sortById: number;
  }): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(
        `/api/get/pizzas/?categoryId=${categoryId}&sortById=${sortById}`
      )
      .pipe();
  }
}
