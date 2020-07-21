import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../conprees-ui-v2/src/environments/environment";
import { User } from "./_models/user";

@Injectable({ providedIn: "root" })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public getUserValue(): User {
    this.getMe();
    if (this.userSubject == null) {
      this.getMe();
    }
    return this.userSubject.value;
  }

  getMe() {
    console.log(`${environment.apiUrl}/rest/me`);
    return this.http.get<User>(`${environment.apiUrl}/rest/me`).subscribe(data=>console.log(data));
  }
}
