import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View7Component } from './view7.component';

describe('View7Component', () => {
  let component: View7Component;
  let fixture: ComponentFixture<View7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ View7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(View7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
