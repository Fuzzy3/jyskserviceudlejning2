import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Produkt } from './model/produkt.model';

@Component({
  selector: 'app-bestilling',
  templateUrl: './bestilling.component.html',
  styleUrls: ['./bestilling.component.scss']
})
export class BestillingComponent implements OnInit {
  productSerier: ProduktSerie[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(produktSerier => this.productSerier = produktSerier);
  }

}
