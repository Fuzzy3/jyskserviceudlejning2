import { FreezePageService } from './bestilling/bestillings-modal/freeze-page.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'jyskserviceudlejning2';
  
  isFrozen: boolean = false;
  
  constructor(private freezeService: FreezePageService) {
  }
  
  
  ngOnInit(): void {
    this.freezeService.freezeChange$.subscribe(value => {
      this.isFrozen = value;
    });
  }

}


