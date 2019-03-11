import { MailService } from './../services/mail.service';
import { Produkt } from './../model/produkt.model';
import { ProduktOrder } from './../model/produktOrder.model';
import { ProduktSerie } from './../model/produktSerie.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { IBestilling } from './../model/bestilling.model';
import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { send } from 'q';


@Component({
  selector: 'app-bestillings-modal',
  templateUrl: './bestillings-modal.component.html',
  styleUrls: ['./bestillings-modal.component.scss']
})
export class BestillingsModalComponent {

  @Input() bestilling: IBestilling;
  @Input() phoneMode: Boolean;
  closeResult: string;


  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('Closed with: ' + result);
    }, (reason) => {
      console.log('Exited ' + this.getDismissReason(reason));
    });
  }

  generateOrderList(): ProduktOrder[] {
    const produkter: ProduktOrder[] = [];
    Object.keys(this.bestilling).forEach(key => {
        const value = this.bestilling[key]; /* Use key, value here */
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

}
