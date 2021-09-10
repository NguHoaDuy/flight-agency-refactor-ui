import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignRequestModel} from "../model/sign-request-model";
import {CookieService} from "ngx-cookie-service";
import {HelperService} from "./helper.service";
import {ResetPasswordModel} from "../model/reset-password-model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private SIGNUP_API = "https://localhost:8090/api/v1/account/signup";
  private SIGNIN_API = "https://localhost:8090/api/v1/account/signin";
  private RESET_API = "https://localhost:8090/api/v1/account/reset";
  private VERIFY_RESET_API = "https://localhost:8090/api/v1/account/verify-reset";

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  signIn(signInModel: SignRequestModel): Observable<object> {
    return this.http.post<object>(this.SIGNIN_API, signInModel);
  }

  signUp(signUpModel: SignRequestModel): Observable<any> {
    return this.http.post(this.SIGNUP_API, signUpModel);
  }

  reset(email: string): Observable<any> {
    return this.http.get(this.RESET_API, {params: { email: email}})
  }

  verifyReset(resetModel: ResetPasswordModel): Observable<any> {
    return this.http.post(this.VERIFY_RESET_API, resetModel)
  }

  signOut() {
    this.helperService.delAllParam(HelperService.VERIFY_PARAM);
  }
}
