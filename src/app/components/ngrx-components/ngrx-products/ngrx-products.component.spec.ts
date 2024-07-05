import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxProductsComponent } from './ngrx-products.component';

describe('NgrxProductsComponent', () => {
  let component: NgrxProductsComponent;
  let fixture: ComponentFixture<NgrxProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxProductsComponent]
    });
    fixture = TestBed.createComponent(NgrxProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
