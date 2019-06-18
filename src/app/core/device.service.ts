import { DeviceWidth, WidthSize } from './deviceWidth.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly MOBILE_BREAKPOINT = 0;
  private readonly TABLET_BREAKPOINT = 768;
  private readonly LAPTOP_BREAKPOINT = 992;
  private readonly DESKTOP_BREAKPOINT = 1200;

  private deviceWidthSubject = new BehaviorSubject<DeviceWidth>(DeviceWidth.default());

  public windowSizeChanged(width: number): void {
    this.deviceWidthSubject.next(this.getDeviceWidth(width));
  }

  private getDeviceWidth(width: number): DeviceWidth {
    if (width > this.MOBILE_BREAKPOINT && width < this.TABLET_BREAKPOINT) {
      return new DeviceWidth(WidthSize.Mobile);
    }
    if (width > this.TABLET_BREAKPOINT && width < this.LAPTOP_BREAKPOINT) {
      return new DeviceWidth(WidthSize.Tablet);
    }
    if (width > this.LAPTOP_BREAKPOINT && width < this.DESKTOP_BREAKPOINT) {
      return new DeviceWidth(WidthSize.Laptop);
    }
    return new DeviceWidth(WidthSize.Desktop);
  }

  public getDeviceWidth$(): Observable<DeviceWidth> {
    return this.deviceWidthSubject.asObservable().pipe(
      publishReplay(1),
      refCount()
    );
  }

  constructor() { }
}
