import { OrderService } from './../../core/order.service';
import { ProductService } from './product.service';
import { Produkt } from './../model/produkt.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestilling, IBestilling } from './../model/bestilling.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { publishLast, refCount, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MailService {

    bestilling: IBestilling;
    info: BestillingInfo;
    receiverMail: String = 'jyskserviceudlejning@gmail.com';
    ekspeditionsgebyr = 62.50;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient, private router: Router, private orderService: OrderService) {
        http.get<{}>('assets/mail_receiver.json').pipe(
            catchError((error: Response) => {
                console.error('Kunne ikke læse mailmodtager', error.statusText);
                return of({});
            }),
            publishLast(),
            refCount()
        ).subscribe(mailjson => this.receiverMail = mailjson.mail_receiver);
        orderService.getOrder$().subscribe(bestilling => this.bestilling = bestilling);
    }

    sendMail(info: BestillingInfo) {
        this.info = info;
        const url = 'https://us-central1-jyskserviceudlejningdk.cloudfunctions.net/httpEmail';

        const htmlToSend = this.generateEmailHtml();
        const toEmail = this.receiverMail;
        const fromEmail = info.email;
        const subjectFromInfo = 'Ny bestilling d. ' + info.dato + ' af ' + info.navn;
        const textToSend = 'Bestilling fra: ' + info.navn;

        if (htmlToSend && toEmail && fromEmail && subjectFromInfo && textToSend) {
            this.router.navigateByUrl('/loading');
            const emailRequest = {
                to: toEmail,
                from: fromEmail,
                subject: subjectFromInfo,
                text: textToSend,
                html: htmlToSend
            };

            this.http.post(url, emailRequest).subscribe(res => {
                this.orderService.clearOrder();
                this.router.navigateByUrl('/tak-for-din-bestilling');
            });
            return true;
        }
        return false;
    }

    generateHeaderHtml(name: string, date: string): string {
        let html = '<div>';
        html = html.concat(this.paragraf(this.bold('Bestiller:') + ' ' + this.info.navn));
        html = html.concat(this.paragraf(this.bold('Bestillingsdato:') + ' ' + date));
        html = html.concat('</div>');
        return html;
    }

    bold(text: string): string {
        return '<strong>' + text + '</strong>';
    }

    paragraf(text: string): string {
        return '<p>' + text + '</p>';
    }


    generateFooterHtml(): string {
        let html = '<div>';
        html = html.concat(this.paragraf(this.bold('Email: ') + this.info.email));
        html = html.concat(this.paragraf(this.bold('Telefon: ') + this.info.telefon));
        html = html.concat(this.paragraf(this.bold('Adresse: ') + this.info.adresse + ', ' + this.info.postnr + ' ' + this.info.by));
        html = html.concat(this.paragraf(this.bold('Ekstra besked:') + '<br>' + this.info.besked));
        html = html.concat('</div>');
        return html;
    }

    generateEmailHtml(): String {
        let html = '<div style="font-size: 15px; color: black;">';
        html = html.concat(this.generateHeaderHtml(this.info.navn, this.info.dato));
        html = html.concat(this.generateOrderListHtml());
        html = html.concat(this.generateFooterHtml());
        html = html.concat('</div>');
        return html;
    }

    generateOrderListHtml(): string {
        let sumAllProducts = 0;

        let html = '<hr><div>';
        html = html.concat(this.paragraf(this.bold('Bestilling:') + '<br>'));
        Object.keys(this.bestilling).forEach(key => {
            const value = this.bestilling[key]; /* Use key, value here */
            const sumSingleProduct = this.calcProductPrice(value.produkt.pris, value.antal);
            html = html.concat(this.paragraf(value.antal + ' x ' + value.produkt.navn + ' - af ' +
                value.produkt.pris + 'kr. stk = ' + sumSingleProduct + 'kr.'));
            sumAllProducts = sumAllProducts + sumSingleProduct;
        });
        sumAllProducts = Math.round((sumAllProducts + this.ekspeditionsgebyr) * 100) / 100;
        html = html.concat(this.paragraf('Ekspeditionsgebyr - af ' + this.ekspeditionsgebyr + 'kr.'));
        html = html.concat(this.paragraf(this.bold('Pris ialt: ') + sumAllProducts + 'kr.'));
        html = html.concat('</div><hr>');
        return html;
    }

    calcProductPrice(price: number, amount: number): number {
        return Math.round(amount * price * 100) / 100;
    }
}
