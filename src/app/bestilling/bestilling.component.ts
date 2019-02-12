import { element } from 'protractor';
import { BestillingInfo } from './model/bestillingInfo.model';
import { Bestilling, IBestilling } from './model/bestilling.model';
import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Produkt } from './model/produkt.model';
import { NgForm } from '@angular/forms';
import { MailService } from './services/mail.service';

@Component({
  selector: 'app-bestilling',
  templateUrl: './bestilling.component.html',
  styleUrls: ['./bestilling.component.scss']
})
export class BestillingComponent implements OnInit, AfterViewInit {
  productSerier: ProduktSerie[];
  bestillingsListe: IBestilling = {};
  menuPosition: any;
  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky: Boolean = false;
  @HostListener('window:scroll', ['$event']) handleScroll() {
    const windowScroll = window.pageYOffset;
        if (windowScroll >= this.menuPosition) {
            console.log('true');
            this.sticky = true;
          } else {
            console.log('false');
            this.sticky = false;
        }
  }

  ngAfterViewInit() {
    this.menuPosition = 213;
  }


  constructor(private productService: ProductService, private mailService: MailService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(produktSerier => this.productSerier = produktSerier);
    if (this.productService.isDataCached()) {
      this.bestillingsListe = this.productService.getBestillingsliste();
    }
  }

  onProductAdded(amount: number, produktSerieId: number, produktId: number) {
    const id = produktSerieId + '' + produktId;
    if (amount === 0) {
      this.bestillingsListe[id] = null;
    }
    this.bestillingsListe[id] = {antal: amount, produkt: this.productSerier[produktSerieId].produkter[produktId]};
    this.productService.setBestillingsliste(this.bestillingsListe);
  }

}
