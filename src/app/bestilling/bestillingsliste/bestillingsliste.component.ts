import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { IBestilling, Bestilling } from '../model/bestilling.model';
import { Produkt } from '../model/produkt.model';
import { generate } from 'rxjs';

@Component({
  selector: 'app-bestillingsliste',
  templateUrl: './bestillingsliste.component.html',
  styleUrls: ['./bestillingsliste.component.scss']
})
export class BestillingslisteComponent implements OnInit {

  @Input() bestilling: IBestilling;

  constructor() { }

  ngOnInit() {
  }

  generateOrderList(): Bestilling[] {
    const produkter: Bestilling[] = [];
    Object.keys(this.bestilling).forEach(key => {
        const value = this.bestilling[key]; /* Use key, value here */
        if (value.antal > 0) {
          produkter.push(value);
        }
    });
    return produkter;
  }

}
