import { Component, OnInit } from '@angular/core';
import { MailService } from '../bestilling/services/mail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private mailService: MailService) { }

  getMailSender(): Observable<String> {
    return this.mailService.getMailReceiver().pipe(
      map(value => 'mailto:' + value)
    );
  }

  getMail(): Observable<String> {
    return this.mailService.getMailReceiver();
  }

}
