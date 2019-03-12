import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfsluttetBestillingComponent } from './afsluttet-bestilling.component';

describe('AfsluttetBestillingComponent', () => {
  let component: AfsluttetBestillingComponent;
  let fixture: ComponentFixture<AfsluttetBestillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfsluttetBestillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfsluttetBestillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
