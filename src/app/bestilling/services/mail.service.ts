import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestilling, IBestilling } from './../model/bestilling.model';
import { BestillingInfo } from './../model/bestillingInfo.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(info: BestillingInfo, bestilling: IBestilling) {
    console.log(info);
    console.log(bestilling);
    let url= (" https://us-central1-jyskserviceudlejningdk.cloudfunctions.net/httpEmail");
    let params: URLSearchParams = new URLSearchParams();
    let _options = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })};

    params.set('to', 'oestjacobsen93@gmail.com');
    params.set('from', 'redbird.world.solutions@gmail.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');

    return this.http.post(url, params, _options)
                    .toPromise()
                    .then( res => {
                      console.log(res)
                    })
                    .catch(err => {
                      console.log(err)
                    })
  }
}
