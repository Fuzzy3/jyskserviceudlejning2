import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle("Kontakt jyskserviceudlejning her telefon mail")
  }

  ngOnInit() {
  }

}
