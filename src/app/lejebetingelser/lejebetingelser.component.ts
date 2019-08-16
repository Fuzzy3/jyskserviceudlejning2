import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lejebetingelser',
  templateUrl: './lejebetingelser.component.html',
  styleUrls: ['./lejebetingelser.component.scss']
})
export class LejebetingelserComponent implements OnInit {

  constructor(titleService: Title) { 
    titleService.setTitle("Lejebetingelser kan læses her - leje")
  }

  ngOnInit() {
  }

}
