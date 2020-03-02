import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {


  constructor(titleService: Title) {
    titleService.setTitle("Skanderborgserviceudlejning billigt service Aarhus Skanderborg")
  }

  ngOnInit() {
  }

}
