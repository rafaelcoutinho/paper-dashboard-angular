import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthServiceService } from "../auth-service.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const isLoggedIn = this.authService.isLoggedIn();
    const isApiUrl =
      request.url.indexOf("/rest/") && request.url.indexOf("oauth2/") == -1;
    
    if (isLoggedIn && isApiUrl) {
      console.log("force auth header");
      const token = this.authService.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.log("unlogged");
    }

    return next.handle(request);
  }
}
