import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxMainComponent } from './ngrx-main.component';

describe('NgrxMainComponent', () => {
  let component: NgrxMainComponent;
  let fixture: ComponentFixture<NgrxMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxMainComponent],
    });
    fixture = TestBed.createComponent(NgrxMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
