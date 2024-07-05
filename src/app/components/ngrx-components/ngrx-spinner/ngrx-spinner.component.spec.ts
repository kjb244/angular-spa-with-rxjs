import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSpinnerComponent } from './ngrx-spinner.component';

describe('NgrxSpinnerComponent', () => {
  let component: NgrxSpinnerComponent;
  let fixture: ComponentFixture<NgrxSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxSpinnerComponent],
    });
    fixture = TestBed.createComponent(NgrxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
