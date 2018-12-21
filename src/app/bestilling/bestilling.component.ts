import { BestillingInfo } from './model/bestillingInfo.model';
import { Bestilling, IBestilling } from './model/bestilling.model';
import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './services/product.service';
import { Produkt } from './model/produkt.model';
import { NgForm } from '@angular/forms';
import { MailService } from './services/mail.service';

@Component({
  selector: 'app-bestilling',
  templateUrl: './bestilling.component.html',
  styleUrls: ['./bestilling.component.scss']
})
export class BestillingComponent implements OnInit {
  @ViewChild('f') bestillingsForm: NgForm;
  productSerier: ProduktSerie[];
  bestillingsListe: IBestilling = {};
  bestillingInfo: BestillingInfo;
  navn = '';
  adresse = '';
  postnr = '';
  by = '';
  telefon = '';
  email = '';
  dato = '';
  besked = '';

  constructor(private productService: ProductService, private mailService: MailService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(produktSerier => this.productSerier = produktSerier);
  }

  onSubmit() {
    this.bestillingInfo = new BestillingInfo;
    this.bestillingInfo.navn = this.bestillingsForm.form.value.navn;
    this.bestillingInfo.adresse = this.bestillingsForm.form.value.adresse;
    this.bestillingInfo.postnr = this.bestillingsForm.form.value.postnr;
    this.bestillingInfo.by = this.bestillingsForm.form.value.by;
    this.bestillingInfo.telefon = this.bestillingsForm.form.value.telefon;
    this.bestillingInfo.email = this.bestillingsForm.form.value.email;
    this.bestillingInfo.dato = this.bestillingsForm.form.value.dato;
    this.bestillingInfo.besked = this.bestillingsForm.form.value.besked;


    // this.mailService.sendMail(this.bestillingInfo, this.bestillingsListe);
  }

  retrieveInfo(): BestillingInfo {
    this.bestillingInfo = new BestillingInfo();
    this.bestillingInfo.navn = this.bestillingsForm.form.value.navn;
    this.bestillingInfo.adresse = this.bestillingsForm.form.value.adresse;
    this.bestillingInfo.postnr = this.bestillingsForm.form.value.postnr;
    this.bestillingInfo.by = this.bestillingsForm.form.value.by;
    this.bestillingInfo.telefon = this.bestillingsForm.form.value.telefon;
    this.bestillingInfo.email = this.bestillingsForm.form.value.email;
    this.bestillingInfo.dato = this.bestillingsForm.form.value.dato;
    this.bestillingInfo.besked = this.bestillingsForm.form.value.besked;
    return this.bestillingInfo;
  }

  onProductAdded(amount: number, produktSerieId: number, produktId: number) {
    const id = produktSerieId + '' + produktId;
    if(amount == 0) {
      this.bestillingsListe[id] = null;
    }
    this.bestillingsListe[id] = {antal: amount, produkt: this.productSerier[produktSerieId].produkter[produktId]};
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
