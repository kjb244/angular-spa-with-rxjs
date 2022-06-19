import {Component, OnDestroy, OnInit} from '@angular/core';
import {eventDispatcher, store} from "../../store/index";
import {Actions} from "../../store/actions";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Benes, InitialState} from "../../models/state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.css']
})
export class EditcardComponent implements OnInit, OnDestroy {

  sub: any;
  editForm: FormGroup;
  loadingForm: boolean = true;
  error: boolean[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.sub = store.subscribe((initialState: InitialState) =>{
      const account = initialState.accounts.find(e => e.editing === true);
      if (account){
        this.editForm = this.formBuilder.group({});
        const formArr = this.formBuilder.array([]);
        account.benes.forEach((bene,i) =>{
          this.error.push(false);
          formArr.push(this.formBuilder.group({name: [bene.name, Validators.required]}));
        });
        this.editForm.addControl('benes', formArr);
        this.loadingForm = false;
      } else {
        this.router.navigateByUrl('/view5');

      }

    });

  }

  ngOnInit(): void {
    eventDispatcher.next({type: Actions.GET_ACCOUNT_INFO});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  get benes() {
    return this.editForm.controls['benes'] as FormArray;

  }

  onBlurInput(id: number) {
    const arrBenes: Benes[] = this.editForm.controls['benes'].value;
    const arrBenesNames: string[] = arrBenes.map(e => e.name);
    const beneDupsArr: string[] = arrBenesNames.reduce((accum: string[], e: string) =>{
      if(!accum.includes(e)){
        accum.push(e);
      };
      return accum;
    },[]);
    this.error = this.error.map(e => false);

    if (arrBenesNames.length !== beneDupsArr.length){
        this.error[id] = true;

    }

  }

  clickButton(){
    this.router.navigateByUrl('/view5');

  }

}
