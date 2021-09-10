import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterComponent } from './center/center.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {VerifyComponent} from "./verify/verify.component";
import {AuthGuard} from "./auth.guard";
import {NotificationComponent} from "./notification/notification.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '', component: CenterComponent,
    children: [
      {
        path: 'sign-in', component: SignInComponent
      },
      {
        path: 'sign-up', component: SignUpComponent
      },
      {
        path: 'verify', component: VerifyComponent, canActivate: [AuthGuard]
      },
      {
        path: 'notify', component: NotificationComponent
      },
      {
        path: 'reset', component: ResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
