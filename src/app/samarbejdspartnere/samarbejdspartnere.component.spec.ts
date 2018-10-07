import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdspartnereComponent } from './samarbejdspartnere.component';

describe('SamarbejdspartnereComponent', () => {
  let component: SamarbejdspartnereComponent;
  let fixture: ComponentFixture<SamarbejdspartnereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamarbejdspartnereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdspartnereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
