import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MailService } from '../bestilling/services/mail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent {


  constructor(titleService: Title, private mailService: MailService) {
    titleService.setTitle("Skanderborgserviceudlejning billigt service Aarhus Skanderborg")
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
