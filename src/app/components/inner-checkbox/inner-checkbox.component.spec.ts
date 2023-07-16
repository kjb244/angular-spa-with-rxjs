import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerCheckboxComponent } from './inner-checkbox.component';

describe('InnerCheckboxComponent', () => {
  let component: InnerCheckboxComponent;
  let fixture: ComponentFixture<InnerCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
