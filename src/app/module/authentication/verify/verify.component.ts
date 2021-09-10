import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
    });
  }
}
