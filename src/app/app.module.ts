import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";


import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthServiceService } from "./biz/auth-service.service";
import { JwtInterceptor } from "./biz/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./biz/_helpers/error.interceptor";
import { UserService } from "./biz/user.service";
import { AuthGuard } from "./biz/_helpers/auth.guard";


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    LoginPageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthServiceService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
