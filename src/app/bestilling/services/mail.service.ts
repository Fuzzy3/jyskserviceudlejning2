import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestilling, IBestilling } from './../model/bestilling.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MailService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) { }

    sendMail(info: BestillingInfo, bestilling: IBestilling) {
        console.log(info);
        console.log(bestilling);
        const url = 'https://us-central1-jyskserviceudlejningdk.cloudfunctions.net/httpEmail';
        const data = {
            toEmail: 'somebody@example.com',
            name: 'Seff Delaney'
        };

        this.http.post(url, data).subscribe(res => {
            console.log(res);
        });


        // return this.http.post(url, params, this.httpOptions)
        //     .toPromise()
        //     .then( res => {
        //         console.log('hello');
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log('err');
        //         console.log(err);
        // });
    }
}
