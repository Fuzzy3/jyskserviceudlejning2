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
  productSerier: ProduktSerie[];
  @ViewChild('f') bestillingsForm: NgForm;
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
    console.log(this.bestillingsForm);
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
