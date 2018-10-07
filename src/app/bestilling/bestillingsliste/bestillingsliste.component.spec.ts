import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestillingslisteComponent } from './bestillingsliste.component';

describe('BestillingslisteComponent', () => {
  let component: BestillingslisteComponent;
  let fixture: ComponentFixture<BestillingslisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestillingslisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestillingslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
