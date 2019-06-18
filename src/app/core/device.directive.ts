import { DeviceService } from './device.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDevice]'
})
export class DeviceDirective {

  constructor(private deviceService: DeviceService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.deviceService.windowSizeChanged(window.innerWidth);
  }

}
