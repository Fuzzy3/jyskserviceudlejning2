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

  @ViewChild('userInfoForm') bestillingsForm: NgForm;
  @Input() bestilling: IBestilling;
  @Input() disabledOrderButton: boolean;
  closeResult: string;
  bestillingInfo: BestillingInfo;
  navn = '';
  adresse = '';
  postnr = '';
  by = '';
  telefon = '';
  email = '';
  dato = '';
  besked = '';

  constructor(private modalService: NgbModal, private mailService: MailService) {}

  open(content) {
    console.log(this.bestilling);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.onSubmit();
      console.log('Closed with: ' + result);
      //console.log(this.bestillingInfo);
      this.mailService.sendMail(this.bestillingInfo, this.bestilling);
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

  onSubmit() {
    this.bestillingInfo = new BestillingInfo;
    this.bestillingInfo.navn = this.navn;
    this.bestillingInfo.adresse = this.adresse;
    this.bestillingInfo.postnr = this.postnr;
    this.bestillingInfo.by = this.by;
    this.bestillingInfo.telefon = this.telefon;
    this.bestillingInfo.email = this.email;
    this.bestillingInfo.dato = this.dato;
    this.bestillingInfo.besked = this.besked;
    close('Order send');
    console.log(this.bestillingInfo);
  }

  fillFormWithDummyData() {
    this.navn = 'Hans';
    this.adresse = 'Bystævneparken 19';
    this.postnr = '2700';
    this.by = 'Husum';
    this.telefon = '30223568';
    this.email = 'Hans@gmail.com';
    this.dato = '2018-12-24';
    this.besked = 'Kan det hentes d. 23. og afleveres igen d. 27.?';
  }

}
