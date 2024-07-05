import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';

import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { View6Component } from './view6.component';
import { MockService } from '../../services/mock.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';
import { By } from '@angular/platform-browser';

describe('mock service example', () => {
  let service: MockService;
  let mockServiceSpy: SpyObj<MockService>;
  let breweriesMock = [
    {
      id: '1',
      brewery_type: 'test',
      name: 'test brewery',
      state: 'pennsylvania',
    },
    {
      id: '2',
      brewery_type: 'test2',
      name: 'james brewing',
      state: 'west virginia',
    },
  ];

  beforeEach(() => {
    // It is a good idea to re-initiate the spy instance after each run so you do not face any weird side-effects.
    // That way you also do not need to call `mySpy = TestBed.inject(MyService);`
    mockServiceSpy = createSpyObj('MockService', ['getRealData']);
    mockServiceSpy.getBreweryData.and.returnValue(of(breweriesMock));

    TestBed.configureTestingModule({
      providers: [
        MockService,
        { provide: MockService, useValue: mockServiceSpy },
      ],
    });

    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return values', () => {
    service.getBreweryData().subscribe((e) => {
      expect(e[0].name).toEqual('test brewery');
      expect(e.length).toEqual(2);
    });
  });
});

describe('View6Component', () => {
  let view6Component: View6Component;
  let view6Fixture: ComponentFixture<View6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [View6Component],
      providers: [MockService, UntypedFormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    view6Fixture = TestBed.createComponent(View6Component);
    view6Component = view6Fixture.debugElement.componentInstance;
    view6Fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(view6Component).toBeTruthy();
  });

  it('should call make get call returning 0 results', fakeAsync(() => {
    const service = view6Fixture.debugElement.injector.get(MockService);
    let spy_getPosts = spyOn(service, 'getRealData').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    view6Component.ngOnInit();
    tick(100);
    expect(view6Component.breweries).toEqual([]);
  }));

  it('should call make get call returning 2 results', fakeAsync(() => {
    let breweriesMock = [
      {
        id: '1',
        brewery_type: 'test',
        name: 'test brewery',
        state: 'pennsylvania',
      },
      {
        id: '2',
        brewery_type: 'test2',
        name: 'james brewing',
        state: 'west virginia',
      },
    ];
    const service = view6Fixture.debugElement.injector.get(MockService);
    let spy_getPosts = spyOn(service, 'getRealData').and.callFake(() => {
      return Rx.of(breweriesMock).pipe(delay(100));
    });
    view6Component.ngOnInit();
    tick(100);
    expect(view6Component.breweries.length).toEqual(2);
  }));

  it('typing in the search box filters the results', fakeAsync(() => {
    let breweriesMock = [
      {
        id: '1',
        brewery_type: 'test',
        name: 'test brewery',
        state: 'pennsylvania',
      },
      {
        id: '2',
        brewery_type: 'test2',
        name: 'james brewing',
        state: 'west virginia',
      },
    ];
    const fixture = TestBed.createComponent(View6Component);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(MockService);
    let spy_getPosts = spyOn(service, 'getRealData').and.callFake(() => {
      return Rx.of(breweriesMock).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;

    component.view6Form.controls.search.setValue('kevin');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let tr = fixture.debugElement.queryAll(By.css('tbody tr:not(.hide)'));
    expect(tr.length).toEqual(0);
    tick(100);

    component.view6Form.controls.search.setValue('brewery');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tr = fixture.debugElement.queryAll(By.css('tbody tr:not(.hide)'));
    expect(tr.length).toEqual(1);
    tick(100);

    component.view6Form.controls.search.setValue('t');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tr = fixture.debugElement.queryAll(By.css('tbody tr:not(.hide)'));
    expect(tr.length).toEqual(2);
    tick(100);

    flush();
  }));
});
