import { BestillingInfo } from './../../model/bestillingInfo.model';
import { IBestilling } from './../../model/bestilling.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { ProduktOrder } from '../../model/produktOrder.model';

@Component({
  selector: 'app-bestillings-modal-form',
  templateUrl: './bestillings-modal-form.component.html',
  styleUrls: ['./bestillings-modal-form.component.scss']
})
export class BestillingsModalFormComponent implements OnInit {

  @Input() bestilling: IBestilling;
  @Input() disabledOrderButton: boolean;
  @Output() mailFormSubmitted = new EventEmitter<boolean>();

  bestillingInfo: BestillingInfo;
  navn = '';
  adresse = '';
  postnr = '';
  by = '';
  telefon = '';
  email = '';
  dato = '';
  besked = '';

  constructor(private mailService: MailService) { }


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
    const wasMailSent = this.mailService.sendMail(this.bestillingInfo);
    this.mailFormSubmitted.emit(true);
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

  ngOnInit() {
  }

}
