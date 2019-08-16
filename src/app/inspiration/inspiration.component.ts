import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.scss']
})
export class InspirationComponent implements OnInit {

  constructor(titleService: Title) { 
    titleService.setTitle("Inspiration til festen Jyskserviceudlejning")
  }

  ngOnInit() {
  }

}
