import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {SignRequestModel} from "../../../core/model/sign-request-model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {EmailValidator} from "../../../core/validation/validation";
import {FORM_ERRORS} from "../../../core/validation/error-message";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../center/center.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  GOOGLE_AUTH_URL = "https://localhost:8090/oauth2/authorization/google"
  FACEBOOK_AUTH_URL = "https://localhost:8090/oauth2/authorization/facebook"
  GITHUB_AUTH_URL = "https://localhost:8090/oauth2/authorization/github"

  signInForm = this.formBuilder.group(
    {
      username: [''],
      password: ['']
    }
  )

  resetForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, EmailValidator]]
    }
  )

  // subscription
  subscr: Subscription[] = [];

  errors = FORM_ERRORS;
  isForgot = false;
  hasSocialSignedUp = false;
  hasBadCredential = false;
  hasSentReset = false;
  sec: number = 3;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscr[0] = this.route.queryParamMap.subscribe(param => {
      this.hasSocialSignedUp = param.get("social") != null;
    })
  }


  onSubmit() {
    const signInModel = this.signInForm.value as SignRequestModel;
    this.subscr[1] = this.authenticationService.signIn(signInModel).subscribe(
      (response) => {
        // @ts-ignore
        window.open(response.url, "_self");
      },
      err => {
        this.hasBadCredential = true;
      }
    )
  }

  sendReset() {
    this.subscr[2] = this.authenticationService.reset(this.email?.value).subscribe();
    this.hasSentReset = true;
    let timerId = setInterval(
      () => {
        if(this.sec <= 0) {
          this.router.navigate(["/"]);
          clearInterval(timerId);
        }
        this.sec--;
      }
      , 1000);
  }

  delErr() {
    this.hasBadCredential = false;
  }

  ngOnDestroy(): void {
    this.subscr.forEach(sub => {
      if (sub)
        sub.unsubscribe();
    })
  }

  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

  get email() {
    return this.resetForm.get('email');
  }


}
