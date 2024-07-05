import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalGroceryListComponent } from './signal-grocery-list.component';

describe('SignalGroceryListComponent', () => {
  let component: SignalGroceryListComponent;
  let fixture: ComponentFixture<SignalGroceryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalGroceryListComponent],
    });
    fixture = TestBed.createComponent(SignalGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
