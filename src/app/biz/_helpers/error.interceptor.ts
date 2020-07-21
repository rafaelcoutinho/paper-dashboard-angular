import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthServiceService } from "../auth-service.service";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private accountService: AuthServiceService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        console.log("inter", err);
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.accountService.logout();
          this.router.navigate(["/login"]);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
