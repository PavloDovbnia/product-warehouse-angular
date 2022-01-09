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
import {ManufacturersComponent} from "./products/manufacturers/manufacturers.component";
import {ManufacturerComponent} from "./products/manufacturers/manufacturer/manufacturer.component";
import {ChangePasswordComponent} from "./login/change-password/change-password.component";
import {UserComponent} from "./register/user/user.component";
import {ProductsStockDataComponent} from "./products-stock-data/products-stock-data.component";
import {ProductProviderComponent} from "./products-stock-data/product-provider/product-provider.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products/categories/:id',
        component: CategoryComponent,
        outlet: 'editor',
      },
      // {
      //   path: 'products/categories/new',
      //   component: CategoryComponent,
      //   outlet: 'editor',
      // },
      {
        path: 'products/categories',
        component: CategoriesComponent,
      },
      // {
      //   path: 'products/properties/new',
      //   component: ItemPropertyComponent,
      //   outlet: 'editor'
      // },
      {
        path: 'products/properties/:id',
        component: ItemPropertyComponent,
        outlet: 'editor'
      },
      {
        path: 'products/properties',
        component: ItemPropertiesComponent,
      },
      {
        path: 'products/manufacturers',
        component: ManufacturersComponent
      },
      // {
      //   path: 'products/manufacturer/new',
      //   component: ManufacturersComponent,
      //   outlet: 'editor'
      // },
      {
        path: 'products/manufacturer/:id',
        component: ManufacturerComponent,
        outlet: 'editor'
      },
      {
        path: 'users',
        component: RegisterComponent,
      },
      {
        path: 'users/user/new',
        component: UserComponent,
        outlet: 'editor',
      },
      {
        path: 'users/user/:id',
        component: UserComponent,
        outlet: 'editor',
      },
      {
        path: 'stock-data',
        component: ProductsStockDataComponent,
      },
      {
        path: 'product-provider/:productId',
        component: ProductProviderComponent,
        outlet: 'editor',
      },
    ]
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
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
