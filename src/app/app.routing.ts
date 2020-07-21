import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthGuard } from "./biz/_helpers/auth.guard";

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  { path: 'landing', component: LandingPageComponent },  
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' 
  }, {
    path: '',
    component: AdminLayoutComponent,
    
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }], canActivate: [AuthGuard]}
  // ,
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
]
