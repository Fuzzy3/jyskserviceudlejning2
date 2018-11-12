import { Bestilling, IBestilling } from './../model/bestilling.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  sendMail(info: BestillingInfo, bestilling: IBestilling) {
    console.log(info);
    console.log(bestilling);
  }
}
