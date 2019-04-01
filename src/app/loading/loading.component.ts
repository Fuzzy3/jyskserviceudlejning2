import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  TIME_OUT: number = 30 * 1000;
  timerObject: Observable<number>;
  subscription: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.timerObject = timer(this.TIME_OUT);
    this.subscription = this.timerObject.subscribe(val => this.router.navigateByUrl('/'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
