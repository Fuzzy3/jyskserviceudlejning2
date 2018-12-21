import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestillingsModalComponent } from './bestillings-modal.component';

describe('BestillingsModalComponent', () => {
  let component: BestillingsModalComponent;
  let fixture: ComponentFixture<BestillingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestillingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestillingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
