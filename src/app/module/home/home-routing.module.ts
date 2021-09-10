import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {MainComponent} from "./main/main.component";
import {AirportResolver} from "../../core/resolver/airport.resolver";

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {
        path: '', component: MainComponent, resolve: { airports: AirportResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
