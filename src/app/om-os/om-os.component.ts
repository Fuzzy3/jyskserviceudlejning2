import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-om-os',
  templateUrl: './om-os.component.html',
  styleUrls: ['./om-os.component.scss']
})
export class OmOsComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle("Læs om os her - jyskserviceudlejning");
  }

  ngOnInit() {
  }

}
