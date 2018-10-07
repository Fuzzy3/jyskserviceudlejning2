import { Injectable } from '@angular/core';
import { Product } from '../model/produkt.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
  {
    navn: 'bord',
    pris: 20,
    billedURL: 'assets/dummy.bmp'
  },
  {
    navn: 'stol',
    pris: 5,
    billedURL: 'assets/dummy.bmp'
  },
  {
    navn: 'bord',
    pris: 20,
    billedURL: 'assets/dummy.bmp'
  },{
    navn: 'stol',
    pris: 5,
    billedURL: 'assets/dummy.bmp'
  },
  {
    navn: 'bord',
    pris: 20,
    billedURL: 'assets/dummy.bmp'
  },{
    navn: 'stol',
    pris: 5,
    billedURL: 'assets/dummy.bmp'
  }]

  getProducts() {
    return this.products;
  }

  constructor() { }
}
