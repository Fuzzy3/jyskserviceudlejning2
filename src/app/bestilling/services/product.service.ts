import { ProduktSerie } from './../model/produktSerie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, publishLast, refCount} from 'rxjs/operators';

import { Produkt } from '../model/produkt.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private request$: Observable<ProduktSerie[]>;

  constructor(http: HttpClient) {
    this.request$ = http.get<Produkt[]>('assets/produkter.json').pipe(
      catchError((error: Response) => {
        console.error('Kunne ikke læse produkter', error.statusText);
        return of([]);
      }),
      publishLast(),
      refCount()
    );
  }

  public getProducts(): Observable<ProduktSerie[]> {
    return this.request$;
  }


}
