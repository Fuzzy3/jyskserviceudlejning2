import { DeviceService } from './device.service';
import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDevice]'
})
export class DeviceDirective implements OnInit {
  
  constructor(private deviceService: DeviceService) { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.deviceService.windowSizeChanged(window.innerWidth);
  }
  
  ngOnInit(): void {
    this.deviceService.windowSizeChanged(window.innerWidth);
  }
}
