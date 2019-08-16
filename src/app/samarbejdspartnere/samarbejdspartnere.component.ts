import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-samarbejdspartnere',
  templateUrl: './samarbejdspartnere.component.html',
  styleUrls: ['./samarbejdspartnere.component.scss']
})
export class SamarbejdspartnereComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle("Samarbejdspartnere - vil du være med");
  }

  ngOnInit() {
  }

}
