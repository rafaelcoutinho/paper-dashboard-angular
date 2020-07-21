import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  loginForm;
  loading = false;
  submitted = false;
  returnUrl: string;
  resp: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["admin@conprees.org", Validators.required],
      password: ""
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit(loginData) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // Process checkout data here
    this.service
      .authenticate(loginData.email, loginData.password)
      .subscribe(data => {
        console.log(data);
        if (true) {
          console.log("ok");
          this.router.navigate(["/main"]);
        } else {
          console.log("nok");
        }
      });

    this.loginForm.reset();
  }
}
