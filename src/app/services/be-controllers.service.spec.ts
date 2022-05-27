import { TestBed } from '@angular/core/testing';

import { BeControllersService } from './be-controllers.service';

describe('BeControllersService', () => {
  let service: BeControllersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeControllersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
