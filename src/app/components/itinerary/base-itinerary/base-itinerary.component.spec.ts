import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseItineraryComponent } from './base-itinerary.component';

describe('BaseItineraryComponent', () => {
  let component: BaseItineraryComponent;
  let fixture: ComponentFixture<BaseItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseItineraryComponent]
    });
    fixture = TestBed.createComponent(BaseItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
