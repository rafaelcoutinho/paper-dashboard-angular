import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpClientModule,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { map } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable()
export class AuthServiceService {
  private tokenInfo;
  constructor(private http: HttpClient) {
    this.tokenInfo = JSON.parse(localStorage.getItem("token"));
    console.log("sabed", this.tokenInfo, localStorage.getItem("token"));
  }
  public isLoggedIn() {
    return this.tokenInfo != null;
  }
  public getToken() {
    return this.tokenInfo.access_token;
  }
  public authenticate(email, password) {
    var authInfo = btoa(email + ":" + password);
    var httpOptions = {
      observe: "response" as const,
      responseType: "json" as const,
      headers: new HttpHeaders({
        Authorization: "Basic " + authInfo
      })
    };
    console.log(`${environment.apiUrl}/rest/oauth2/default/v1/token`);
    return this.http
      .post(
        `${environment.apiUrl}/rest/oauth2/default/v1/token`,
        null,
        httpOptions
      )
      .pipe(
        map(token => {
          this.tokenInfo = token.body;
          console.log("token", this.tokenInfo);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", JSON.stringify(this.tokenInfo));
          return true;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("token");
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
