import { Produkt } from './../model/produkt.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestilling, IBestilling } from './../model/bestilling.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MailService {

    bestilling: IBestilling;
    info: BestillingInfo;
    receiverMail: String = 'redbird.world.solutions@gmail.com';
    ekspeditionsgebyr = 62.50;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient, private router: Router) { }

    sendMail(info: BestillingInfo, bestilling: IBestilling) {
        this.info = info;
        this.bestilling = bestilling;
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
            console.log(emailRequest);

            this.http.post(url, emailRequest).subscribe(res => {
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
        console.log(this.info.dato);
        html = html.concat(this.generateHeaderHtml(this.info.navn, this.info.dato));
        html = html.concat(this.generateOrderListHtml());
        html = html.concat(this.generateFooterHtml());
        html = html.concat('</div>');
        console.log(html);
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
        sumAllProducts = sumAllProducts + this.ekspeditionsgebyr;
        html = html.concat(this.paragraf('Ekspeditionsgebyr - af ' + this.ekspeditionsgebyr + 'kr.'));
        html = html.concat(this.paragraf(this.bold('Pris ialt: ') + sumAllProducts));
        html = html.concat('</div><hr>');
        return html;
    }

    calcProductPrice(price: number, amount: number): number {
        return amount * price;
    }
}
