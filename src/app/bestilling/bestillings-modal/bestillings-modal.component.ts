import { DeviceWidth, WidthSize } from './../../core/deviceWidth.model';
import { DeviceService } from './../../core/device.service';
import { MailService } from './../services/mail.service';
import { Produkt } from './../model/produkt.model';
import { ProduktOrder } from './../model/produktOrder.model';
import { ProduktSerie } from './../model/produktSerie.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { IBestilling, Bestilling } from './../model/bestilling.model';
import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, EventEmitter, Output, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { send } from 'q';
import { OrderService } from 'src/app/core/order.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';

@Component({
  selector: 'app-bestillings-modal',
  templateUrl: './bestillings-modal.component.html',
  styleUrls: ['./bestillings-modal.component.scss'],
  animations: [
    trigger('bounce', [
      transition('* => *', useAnimation(bounce))]),
  ]
})
export class BestillingsModalComponent implements OnInit   {

  bounce = false;
  basketLeftMargin = "1000px";
  basketTopMargin = "115px";
  produkter: ProduktOrder[] = [];

  @Input() shoppingBasket = false;

  closeResult: string;


  constructor(private modalService: NgbModal, private orderService: OrderService) {
    orderService.getOrder$().subscribe(order => {
        this.produkter = this.generateOrderList(order);
        this.bounce = !this.bounce;
      });
    }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {

    });
  }

  private getOrderAmount(): number {
    return this.produkter.length;
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  closeModal(shouldClose) {
    if (shouldClose) {
      this.modalService.dismissAll('Submitted');
    }
  }

  removeProduct(produkt: Produkt) {
    this.orderService.removeProductFromOrder(produkt.navn);
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calcBasketLeftMargin(window.innerWidth);
  }
  
  private calcBasketLeftMargin(width: number): void {
    if(width > 991) {
      this.basketLeftMargin = ((width-677)/2)+677 + "px"; //677,44px
      this.basketTopMargin = "115px";
    } else {
      this.basketLeftMargin = (width-170) + "px";
      this.basketTopMargin = "119px";
    }
  }
  
  ngOnInit(): void {
    this.calcBasketLeftMargin(window.innerWidth);
  }

}
