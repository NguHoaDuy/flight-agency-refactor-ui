import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidator} from "../../../core/validation/validation";
import {FORM_ERRORS} from "../../../core/validation/error-message";
import {ActivatedRoute, Router} from "@angular/router";
import {SignRequestModel} from "../../../core/model/sign-request-model";
import {ResetPasswordModel} from "../../../core/model/reset-password-model";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../core/service/authentication.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  errors = FORM_ERRORS;
  resetForm = this.formBuilder.group({
    password: this.formBuilder.group({
      input: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    }, {validators: [PasswordValidator]
    })
  })

  // subscription
  subscr: Subscription[] = [];

  result: boolean = false;
  hasResult: boolean = false;
  private resetCode: string | null = ""

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParamMap.subscribe(p => {
      this.resetCode = p.get("code");
      if (this.resetCode == null)
        this.router.navigate(["/"]);
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscr.forEach(sub => {
      if (sub)
        sub.unsubscribe();
    })
  }

  onSubmit() {
    const resetModel: ResetPasswordModel = {
      password: this.input?.value,
      code: this.resetCode
    };
    this.subscr[0] = this.authenticationService.verifyReset(resetModel).subscribe(
      (val: object) => {
        debugger
        // @ts-ignore
        let reset: string = val.reset;
        this.result = reset == "success";
        this.hasResult = true;
      }
    )
  }

  get input() {
    return this.resetForm.get('password.input');
  }

  get confirm() {
    return this.resetForm.get('password.confirm');
  }

  get password() {
    return this.resetForm.get('password') as FormGroup;
  }

}
