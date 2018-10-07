import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LejebetingelserComponent } from './lejebetingelser.component';

describe('LejebetingelserComponent', () => {
  let component: LejebetingelserComponent;
  let fixture: ComponentFixture<LejebetingelserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LejebetingelserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LejebetingelserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
