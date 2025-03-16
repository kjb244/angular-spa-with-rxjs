import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormComponent } from './ngrx-form.component';

describe('NgrxFormComponent', () => {
  let component: NgrxFormComponent;
  let fixture: ComponentFixture<NgrxFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxFormComponent]
    });
    fixture = TestBed.createComponent(NgrxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
