import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmailValidator, PasswordValidator} from "../../../core/validation/validation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {FORM_ERRORS} from "../../../core/validation/error-message";
import {Subscription} from "rxjs";
import {SignRequestModel} from "../../../core/model/sign-request-model";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../center/center.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  errors = FORM_ERRORS;
  signUpForm = this.formBuilder.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, EmailValidator]],
      password: this.formBuilder.group(
        {
          input: ['', [Validators.required]],
          confirm: ['', [Validators.required]]
        },
        {validators: [PasswordValidator]}
      )
    }
  )
  // subscription
  subscr: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscr.forEach(sub => {
      if (sub)
        sub.unsubscribe();
    })
  }

  onSubmit() {
    const signUpModel = this.signUpForm.value as SignRequestModel;
    signUpModel.password = this.input?.value;
    this.subscr[0] = this.authenticationService.signUp(signUpModel).subscribe(
      val => {
        this.router.navigate(["../notify"], { relativeTo: this.route})
      },
      err => {
        const errorObj = err.error;
        if (errorObj.errors["email"]) {
          this.email?.setErrors({"email": true})
        }
        if (errorObj.errors["username"]) {
          this.username?.setErrors({"username": true})
        }
      }
    )
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password') as FormGroup;
  }

  get input() {
    return this.signUpForm.get('password.input');
  }

  get confirm() {
    return this.signUpForm.get('password.confirm');
  }

  get email() {
    return this.signUpForm.get('email');
  }
}
