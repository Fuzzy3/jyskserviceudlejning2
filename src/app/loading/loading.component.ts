import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  TIME_OUT: number = 30 * 1000;

  constructor(private router: Router) { }

  ngOnInit() {
    const source = timer(this.TIME_OUT);
    const subscribe = source.subscribe(val => this.router.navigateByUrl('/'));
  }

}
