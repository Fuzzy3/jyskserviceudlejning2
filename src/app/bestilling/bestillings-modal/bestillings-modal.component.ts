import { MailService } from './../services/mail.service';
import { Produkt } from './../model/produkt.model';
import { ProduktSerie } from './../model/produktSerie.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { IBestilling } from './../model/bestilling.model';
import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { send } from 'q';


@Component({
  selector: 'app-bestillings-modal',
  templateUrl: './bestillings-modal.component.html',
  styleUrls: ['./bestillings-modal.component.scss']
})
export class BestillingsModalComponent {

  @Input() bestilling: IBestilling;
  @Input() info: BestillingInfo;
  @Input() disabledOrderButton: boolean;
  closeResult: string;

  constructor(private modalService: NgbModal, private mailService: MailService) {}

  open(content) {
    console.log(this.bestilling);
    console.log(this.info);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('Closed with: ' + result);
      this.mailService.sendMail(this.info, this.bestilling);
    }, (reason) => {
      console.log('Exited ' + this.getDismissReason(reason));
    });
  }

  generateOrderList(): Produkt[] {
    const produkter: Produkt[] = [];
    Object.keys(this.bestilling).forEach(key => {
        const value = this.bestilling[key]; /* Use key, value here */
        produkter.push(value.produkt);
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

}
