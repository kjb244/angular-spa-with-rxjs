import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {
  Form,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BeControllersService } from '../../services/be-controllers.service';
import { Router } from '@angular/router';
import { GetPayload } from '../../models/getpayload';
import { eventDispatcher, store } from '../../store/index';
import { Actions } from '../../store/actions';
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.css'],
  animations: [animations],
})
export class View4Component implements OnInit, OnDestroy {
  sub: any;
  view4Form: UntypedFormGroup = this.formBuilder.group({});
  levels: string[] = ['beginner', 'intermediate', 'advanced'];
  formData: { [key: string]: any } = {};
  loadingForm: boolean = true;
  testAnimation: string = 'in';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private beControllersService: BeControllersService,
  ) {
    this.sub = store.subscribe((state) => {
      const { currRoute, formData, type } = state;
      if (type === Actions.NEXT_VIEW) {
        this.router.navigateByUrl('/' + currRoute);
      } else if (type === Actions.GET_DATA) {
        const formGroupMaster: UntypedFormGroup = this.formBuilder.group({});
        this.view4Form = formGroupMaster;
        if (formData && Object.keys(formData).length) {
          for (let key in formData) {
            const memoryData = formData[key];
            if (Array.isArray(memoryData)) {
              formGroupMaster.addControl(key, this.formBuilder.array([]));
              memoryData.forEach((e) => {
                const freshObj: any = {};
                // needs to look like this --> title: ['',Validators.required],
                Object.keys(e).forEach((k) => {
                  freshObj[k] = [e[k], Validators.required];
                });
                const control = this.view4Form.controls[
                  key
                ] as UntypedFormArray;
                control.push(this.formBuilder.group(freshObj));
              });
            }
          }
        } else {
          formGroupMaster.addControl(
            'lessons',
            this.formBuilder.array([this.getLessonGroup()]),
          );
        }
        this.loadingForm = false;
        this.formData = formData;
        this.view4Form.valueChanges.subscribe((changes) => {
          this.formData = changes;
        });
      }
    });
  }

  ngOnInit(): void {
    this.beControllersService
      .getRouteData()
      .subscribe((getPayload: GetPayload) => {
        eventDispatcher.next({ type: Actions.GET_DATA, payload: getPayload });
        eventDispatcher.next({ type: Actions.GET_BUTTON_DATA });
      });
  }

  getLessonGroup() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required],
    });
  }

  get lessons() {
    return this.view4Form.controls['lessons'] as UntypedFormArray;
  }

  getTitleControls(lesson: any): UntypedFormControl {
    return lesson.controls.title;
  }

  addAnother() {
    this.lessons.push(this.getLessonGroup());
  }

  remove(i: number) {
    this.lessons.removeAt(i);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkFormValidity = () => {
    this.view4Form.markAllAsTouched();

    return this.view4Form.valid || false;
  };

  testAnimationClick() {
    this.testAnimation = this.testAnimation === 'in' ? 'out' : 'in';
  }
}
