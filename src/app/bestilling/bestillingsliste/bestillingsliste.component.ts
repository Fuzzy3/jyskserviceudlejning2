import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { IBestilling, Bestilling } from '../model/bestilling.model';
import { Produkt } from '../model/produkt.model';
import { generate } from 'rxjs';
import { OrderService } from 'src/app/core/order.service';
import { ProduktOrder } from '../model/produktOrder.model';

@Component({
  selector: 'app-bestillingsliste',
  templateUrl: './bestillingsliste.component.html',
  styleUrls: ['./bestillingsliste.component.scss']
})
export class BestillingslisteComponent implements OnInit {

  produkter: ProduktOrder[];

  constructor(private orderService: OrderService) { 
    orderService.getOrder$().subscribe(order => this.produkter = this.generateOrderList(order));
  }

  ngOnInit() {
  }

  generateOrderList(bestilling: IBestilling): ProduktOrder[] {
    const produkter: ProduktOrder[] = [];
    Object.keys(bestilling).forEach(key => {
        const value = bestilling[key]; /* Use key, value here */
        if (value.antal > 0) {
          const produkt: ProduktOrder = new ProduktOrder();
          produkt.antal = value.antal;
          produkt.navn = value.produkt.navn;
          produkt.pris = value.produkt.pris;
          produkter.push(produkt);
        }
    });
    return produkter;
  }

  getOrderAmount(): number {
    return this.produkter.length;
  }

  removeProduct(productToBeRemoved: Produkt) {
    console.log(productToBeRemoved);
    this.orderService.removeProductFromOrder(productToBeRemoved.navn);
  }

}
