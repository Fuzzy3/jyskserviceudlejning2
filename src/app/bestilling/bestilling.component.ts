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
  @ViewChild('stickyParent') parentMenuElement: ElementRef;
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
    console.log(this.menuElement);
    let elementTop = this.menuElement.nativeElement.offsetTop;
    const elementHeight = this.menuElement.nativeElement.offsetHeight;
    let traverse = this.menuElement.nativeElement.offsetParent;

    while (traverse) {
      elementTop += traverse.offsetTop;
      traverse = traverse.offsetParent;
    }
    this.menuPosition = elementTop + (elementHeight / 2.0);
    console.log(this.menuPosition);
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
