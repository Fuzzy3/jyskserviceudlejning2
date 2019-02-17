import { IBestilling } from './../model/bestilling.model';
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
  private bestilling: IBestilling;
  private dataCached = false;

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

  public setBestillingsliste(bestilling: IBestilling) {
    this.bestilling = bestilling;
    this.dataCached = true;
  }

  public getBestillingsliste(): IBestilling {
    return this.bestilling;
  }

  public isDataCached(): boolean {
    return this.dataCached;
  }


}
