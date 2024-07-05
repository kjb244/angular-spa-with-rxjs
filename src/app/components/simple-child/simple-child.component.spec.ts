import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChildComponent } from './simple-child.component';

describe('SimpleChildComponent', () => {
  let component: SimpleChildComponent;
  let fixture: ComponentFixture<SimpleChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleChildComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
