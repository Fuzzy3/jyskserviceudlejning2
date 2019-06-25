import { OrderService } from './../core/order.service';
import { WidthSize, DeviceWidth } from './../core/deviceWidth.model';
import { DeviceService } from './../core/device.service';
import { objectFitImages } from 'object-fit-images';
import { BestillingInfo } from './model/bestillingInfo.model';
import { Bestilling, IBestilling } from './model/bestilling.model';
import { ProduktSerie } from './model/produktSerie.model';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, EventEmitter, Inject } from '@angular/core';
import { ProductService } from './services/product.service';
import { Produkt } from './model/produkt.model';
import { NgForm } from '@angular/forms';
import { MailService } from './services/mail.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-bestilling',
  templateUrl: './bestilling.component.html',
  styleUrls: ['./bestilling.component.scss']
})
export class BestillingComponent implements OnInit {

  productSerier: ProduktSerie[];
  bestillingsListe: IBestilling = {};
  menuPosition: any = 233;
  @ViewChild('stickyMenu', { static: true }) menuElement: ElementRef;
  @ViewChild('fullHeight', { static: true }) fullHeightElement: ElementRef;
  stickyBot = false;
  isSticky = false;
  isMobile = false;
  innerHeight: any;
  public innerWidth: any;

  @HostListener('window:scroll', ['$event']) handleScroll() {
    const this.window = this.window.pageYOffset;
    if (!this.isMobile) {
      if ((this.window >= this.menuPosition) && (this.window <= this.calcStopperY())) {
        this.isSticky = true;
        this.stickyBot = false;
      } else if (this.window > this.calcStopperY()) {
        this.isSticky = false;
        this.stickyBot = true;
      } else {
        this.isSticky = false;
        this.stickyBot = false;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = this.window.innerHeight;
  }

  private calcStopperY() {
    const fullHeight = this.fullHeightElement.nativeElement.clientHeight;
    return fullHeight + this.menuPosition - (innerHeight * 0.8);
  }


  constructor(@Inject(WINDOW) private window: Window, productService: ProductService, deviceService: DeviceService, private orderService: OrderService) {
    deviceService.getDeviceWidth$().subscribe(deviceWidth => this.updateOnMobileDevice(deviceWidth));
    productService.getProducts().subscribe(produktSerier => this.productSerier = produktSerier);
    orderService.getOrder$().subscribe(order => this.bestillingsListe = order);
  }

  updateOnMobileDevice(deviceWidth: DeviceWidth) {
    if (deviceWidth.getWidthSize() === WidthSize.Mobile) {
      this.isMobile = true;
      this.isSticky = true;
    } else {
      this.isMobile = false;
      this.isSticky = false;
    }
  }

  ngOnInit() {
  }

  onProductAdded(amount: number, produktSerieId: number, produktId: number) {
    const id = produktSerieId + '' + produktId;
    if (amount === 0) {
      this.bestillingsListe[id] = null;
    }
    const trimmedAmount = parseInt(amount + '', 10);
    this.bestillingsListe[id] = {antal: trimmedAmount, produkt: this.productSerier[produktSerieId].produkter[produktId]};
    this.orderService.setOrder(this.bestillingsListe);
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
    this.orderService.setOrder(this.bestillingsListe);
  }

  getNumber(pris: number): String {
    const twoDecimalsPrice = (Math.round(pris * 100) / 100).toFixed(2);
    return (twoDecimalsPrice + '').replace('.', ',');
  }

}
