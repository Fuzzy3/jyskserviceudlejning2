import { objectFitImages } from 'object-fit-images';
import { BestillingInfo } from './model/bestillingInfo.model';
import { Bestilling, IBestilling } from './model/bestilling.model';
import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, EventEmitter } from '@angular/core';
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

  productSerier: ProduktSerie[];
  bestillingsListe: IBestilling = {};
  menuPosition: any = 233;
  @ViewChild('stickyMenu') menuElement: ElementRef;
  @ViewChild('fullHeight') fullHeightElement: ElementRef;
  stickyBot: Boolean = false;
  sticky: Boolean = false;
  phoneWidth: Boolean = false;
  innerHeight: any;
  public innerWidth: any;

  @HostListener('window:scroll', ['$event']) handleScroll() {
    const windowScroll = window.pageYOffset;
    if (!this.phoneWidth) {
      if ((windowScroll >= this.menuPosition) && (windowScroll <= this.calcStopperY())) {
        this.sticky = true;
        this.stickyBot = false;
      } else if (windowScroll > this.calcStopperY()) {
        this.sticky = false;
        this.stickyBot = true;
      } else {
        this.sticky = false;
        this.stickyBot = false;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    this.setPhoneWidth(innerWidth);
  }

  private calcStopperY() {
    const fullHeight = this.fullHeightElement.nativeElement.clientHeight;
    return fullHeight + this.menuPosition - (innerHeight * 0.8);
  }

  private setPhoneWidth(width: number) {
    if (width < 768) {
      this.phoneWidth = true;
      this.sticky = true;
    } else {
      this.phoneWidth = false;
      this.sticky = false;
    }
  }


  constructor(private productService: ProductService, private mailService: MailService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setPhoneWidth(this.innerWidth);
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
    const trimmedAmount = parseInt(amount + '', 10);
    this.bestillingsListe[id] = {antal: trimmedAmount, produkt: this.productSerier[produktSerieId].produkter[produktId]};
    this.productService.setBestillingsliste(this.bestillingsListe);
  }

  onKuvertProductAdded(amount: number, productid: string, produktNavn: string, pris: number) {
    const id = productid;
    if (amount === 0) {
      this.bestillingsListe[id] = null;
    }
    const trimmedAmount = parseInt(amount + '', 10);
    const kuvert: Produkt = new Produkt();
    kuvert.navn = produktNavn;
    kuvert.pris = pris;
    kuvert.billedURL = '';

    this.bestillingsListe[id] = {antal: trimmedAmount, produkt: kuvert};
    this.productService.setBestillingsliste(this.bestillingsListe);
  }

    productRemoved(productToBeRemoved: string) {
        Object.keys(this.bestillingsListe).forEach(key => {
            if (this.bestillingsListe[key].produkt.navn === productToBeRemoved) {
                this.bestillingsListe[key].antal = 0;
                return;
            }
        });
    }

}
