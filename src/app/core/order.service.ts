import { BehaviorSubject, Observable } from 'rxjs';
import { IBestilling, Bestilling } from './../bestilling/model/bestilling.model';
import { Injectable } from '@angular/core';
import { publish, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderSubject = new BehaviorSubject<IBestilling>({});

  constructor() { }

  public setOrder(bestilling: IBestilling) {
    this.orderSubject.next(bestilling);
  }

  public getOrder$(): Observable<IBestilling> {
    return this.orderSubject.asObservable().pipe(
      publishReplay(1),
      refCount()
    );
  }

  public clearOrder(): void {
    this.setOrder({});
  }

  // Returns true if the item was successfuly removed, otherwise false
  public removeProductFromOrder(productToBeRemoved: string): boolean {
    const order: IBestilling = this.orderSubject.value;
    Object.keys(order).forEach(key => {
        if (order[key].produkt.navn === productToBeRemoved) {
            order[key].antal = 0;
            return;
        }
    });
    return true;
  }

}
