import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MailService } from '../bestilling/services/mail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent implements OnInit {

  constructor(titleService: Title, private mailService: MailService) {
    titleService.setTitle("Kontakt jyskserviceudlejning her telefon mail")
  }

  ngOnInit() {
  }

  getMailSender(): Observable<String> {
    return this.mailService.getMailReceiver().pipe(
      map(value => 'mailto:' + value)
    );
  }

  getMail(): Observable<String> {
    return this.mailService.getMailReceiver();
  }


}
