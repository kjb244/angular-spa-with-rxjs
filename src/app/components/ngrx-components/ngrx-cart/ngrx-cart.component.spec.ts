import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCartComponent } from './ngrx-cart.component';

describe('NgrxCartComponent', () => {
  let component: NgrxCartComponent;
  let fixture: ComponentFixture<NgrxCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxCartComponent]
    });
    fixture = TestBed.createComponent(NgrxCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
