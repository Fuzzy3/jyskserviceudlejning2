import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  toggleHide() {
    this.show = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
