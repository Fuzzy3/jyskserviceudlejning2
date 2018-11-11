import { BestillingInfo } from './model/bestillingInfo.model';
import { Bestilling, IBestilling } from './model/bestilling.model';
import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './services/product.service';
import { Produkt } from './model/produkt.model';
import { NgForm } from '@angular/forms';

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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(produktSerier => this.productSerier = produktSerier);
  }

  onSubmit() {
    this.bestillingInfo.navn = this.navn;
    this.bestillingInfo.adresse = this.adresse;
    this.bestillingInfo.postnr = this.postnr;
    this.bestillingInfo.by = this.by;
    this.bestillingInfo.telefon = this.telefon;
    this.bestillingInfo.email = this.email;
    this.bestillingInfo.dato = this.dato;
    this.bestillingInfo.besked = this.besked;
    console.log(this.bestillingsForm);
  }

  onProductAdded(amount: number, produktSerieId: number, produktId: number) {
    const id = produktSerieId + '' + produktId;
    this.bestillingsListe[id] = {antal: amount, produkt: this.productSerier[produktSerieId].produkter[produktId]};
    console.log(this.bestillingsListe);
  }

  fillFormWithDummyData() {
    this.navn = 'Hans';
    this.adresse = 'Bystævneparken 19';
    this.postnr = '2700';
    this.by = 'Husum';
    this.telefon = '30223568';
    this.email = 'Hans@gmail.com';
    this.dato = '24/12/2018';
    this.besked = 'Kan det hentes d. 23. og afleveres igen d. 27.?';
  }
}
