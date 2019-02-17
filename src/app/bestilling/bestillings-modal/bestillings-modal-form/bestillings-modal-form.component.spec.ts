import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestillingsModalFormComponent } from './bestillings-modal-form.component';

describe('BestillingsModalFormComponent', () => {
  let component: BestillingsModalFormComponent;
  let fixture: ComponentFixture<BestillingsModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestillingsModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestillingsModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
