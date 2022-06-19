import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View1Component } from './components/view1/view1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyComponent } from './components/currency/currency.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { View2Component } from './components/view2/view2.component';
import { SplashComponent } from './components/splash/splash.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { View3Component } from './components/view3/view3.component';
import { CurrencyDirective } from './directives/currency.directive';
import { View4Component } from './components/view4/view4.component';
import { View5Component } from './components/view5/view5.component';
import { CardComponent } from './components/card/card.component';
import { EditcardComponent } from './components/editcard/editcard.component';

const appRoutes: Routes = [
  {path: 'view1',  component: View1Component, data: { animationState: 'One' }},
  {path: 'view2', component: View2Component, data: { animationState: 'Two' }},
  {path: 'view3', component: View3Component, data: { animationState: 'Three'}},
  {path: 'view4', component: View4Component, data: { animationState: 'Four'}},
  {path: 'view5', component: View5Component, data: { animationState: 'Five'}},
  {path: 'editcard', component: EditcardComponent, data: { animationState: 'EditCard'}},
  {path: 'splash', component: SplashComponent, data: { animationState: 'Splash' }},
  {path: '', redirectTo: '/splash', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    CurrencyComponent,
    ButtonsComponent,
    View2Component,
    SplashComponent,
    FormErrorsComponent,
    View3Component,
    CurrencyDirective,
    View4Component,
    View5Component,
    CardComponent,
    EditcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes ,{enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
