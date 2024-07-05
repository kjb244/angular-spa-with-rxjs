import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlPhoneComponent } from './intl-phone.component';

describe('IntlPhoneComponent', () => {
  let component: IntlPhoneComponent;
  let fixture: ComponentFixture<IntlPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntlPhoneComponent],
    });
    fixture = TestBed.createComponent(IntlPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
