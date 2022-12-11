import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View1Component } from './view1.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BeControllersService} from "../../services/be-controllers.service";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {SimpleChildComponent} from "../simple-child/simple-child.component";

describe('View1Component', () => {
  let component: View1Component;
  let fixture: ComponentFixture<View1Component>;
  let service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule,FormsModule],
      declarations: [ View1Component, SimpleChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(View1Component);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(BeControllersService);
    spyOn(service,"getRouteData").and.callFake(() => {
      return of({
        formData: {},
        showNext: true,
        showPrev: false,
      });
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call child should work', () =>{
    spyOn(component.simpleChildComponent,'callMe');
    component.callChild();
    expect(component.simpleChildComponent.callMe).toHaveBeenCalled();
  })
});
