import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./products/categories/categories.component";
import {AuthGuard} from "./auth/auth-guard";
import {CategoryComponent} from "./products/categories/category/category.component";
import {ForgotPasswordComponent} from "./login/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./login/reset-password/reset-password.component";
import {ItemPropertiesComponent} from "./products/item-properties/item-properties.component";
import {ItemPropertyComponent} from "./products/item-properties/item-property/item-property.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/categories/:id',
    component: CategoryComponent,
    outlet: 'editor',
  },
  {
    path: 'products/categories/new',
    component: CategoryComponent,
    outlet: 'editor',
  },
  {
    path: 'products/categories',
    component: CategoriesComponent,
    outlet: 'content'
  },
  {
    path: 'products/properties/new',
    component: ItemPropertyComponent,
    outlet: 'editor'
  },
  {
    path: 'products/properties/:id',
    component: ItemPropertyComponent,
    outlet: 'editor'
  },
  {
    path: 'products/properties',
    component: ItemPropertiesComponent,
    outlet: 'content'
  },
  {
    path: 'register',
    component: RegisterComponent,
    outlet: 'content'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
