import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./module/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'auth', loadChildren: () => import('./module/authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: 'flight', loadChildren: () => import('./module/flight/flight.module').then(mod => mod.FlightModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
