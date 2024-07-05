import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItComponent } from './search-it.component';

describe('SearchItComponent', () => {
  let component: SearchItComponent;
  let fixture: ComponentFixture<SearchItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchItComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
