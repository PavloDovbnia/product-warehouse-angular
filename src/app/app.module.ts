import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {httpInterceptorProviders} from './auth/auth-interceptor';

import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CategoriesComponent} from './products/categories/categories.component';
import {NavigationComponent} from './navigation/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {CategoryComponent} from './products/categories/category/category.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './login/reset-password/reset-password.component';
import {ItemPropertiesComponent} from './products/item-properties/item-properties.component';
import {ItemPropertyComponent} from "./products/item-properties/item-property/item-property.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoriesComponent,
    NavigationComponent,
    CategoryComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ItemPropertiesComponent,
    ItemPropertyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}

Object.defineProperty(BigInt.prototype, "toJSON", {
  get() {
    "use strict";
    return () => String(this);
  }
});
