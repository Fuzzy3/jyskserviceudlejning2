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

  @ViewChild("bestillingListe") productsElement: ElementRef;
  produkter: ProduktOrder[];
  windowHeight: number;
  maxAmount: number = 100;

  constructor(private orderService: OrderService) { 
    orderService.getOrder$().subscribe(order => this.produkter = this.generateOrderList(order));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = window.innerHeight;
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
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

  getOrderAmount(): number  {
    return this.produkter.length;
  }

  getOrderLimit(): number {
    if(this.windowHeight  <= 700) {
      return 13 ;
    } 
    return 20;
  }

  // getOrderLimit(): number {
  //   if(this.maxAmount > this.produkter.length) {
  //     const plusTextHeight = 34;
  //     const dividerHeight = 33;
  //     const buttonHeight = 60;
  //     const orderHeight = (<HTMLElement> this.productsElement.nativeElement).getBoundingClientRect().height;
  //     const fullHeight = plusTextHeight + dividerHeight + buttonHeight + orderHeight;
  //     const dualLineElement = 42;
  //     console.log(fullHeight + dualLineElement);
  //     console.log(orderHeight);
  //     if(fullHeight + dualLineElement > this.windowHeight) {
  //       this.maxAmount = this.produkter.length;
  //     }
  //   }
  //   return this.maxAmount;
  // }

  removeProduct(productToBeRemoved: Produkt) {
    this.orderService.removeProductFromOrder(productToBeRemoved.navn);
  }

}
