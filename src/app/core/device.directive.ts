import { DeviceService } from './device.service';
import { Directive, HostListener, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Directive({
  selector: '[appDevice]'
})
export class DeviceDirective implements OnInit {
  
  constructor(@Inject(WINDOW) private window: Window, private deviceService: DeviceService) { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.deviceService.windowSizeChanged(window.innerWidth);
  }
  
  ngOnInit(): void {
    this.deviceService.windowSizeChanged(window.innerWidth);
  }
}
