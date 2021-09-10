import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/service/authentication.service";
import {HelperService} from "../../../core/service/helper.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSignIn: boolean = false
  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.checkSignIn()
  }


  private checkSignIn() {
    const jwt = this.helperService.getParam("_t");
    if (jwt != null) {
      this.isSignIn = true;
    }
  }

  get username() {
    return this.helperService.getParam("_n")
  }

  signOut() {
    this.authenticationService.signOut();
  }


}
