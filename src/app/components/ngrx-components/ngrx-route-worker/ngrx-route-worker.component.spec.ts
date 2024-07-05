import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxRouteWorkerComponent } from './ngrx-route-worker.component';

describe('NgrxRouteWorkerComponent', () => {
  let component: NgrxRouteWorkerComponent;
  let fixture: ComponentFixture<NgrxRouteWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxRouteWorkerComponent]
    });
    fixture = TestBed.createComponent(NgrxRouteWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
