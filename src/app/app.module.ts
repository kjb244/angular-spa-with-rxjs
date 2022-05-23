import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View1Component } from './components/view1/view1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyComponent } from './components/currency/currency.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { View2Component } from './components/view2/view2.component';
import { SplashComponent } from './components/splash/splash.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';

const appRoutes: Routes = [
  {path: 'view1',  component: View1Component},
  {path: 'view2', component: View2Component},
  {path: 'splash', component: SplashComponent},
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
    FormErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes ,{enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
