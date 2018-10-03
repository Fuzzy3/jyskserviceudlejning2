import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Frontpage3Component } from './frontpage3.component';

describe('Frontpage3Component', () => {
  let component: Frontpage3Component;
  let fixture: ComponentFixture<Frontpage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Frontpage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Frontpage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
