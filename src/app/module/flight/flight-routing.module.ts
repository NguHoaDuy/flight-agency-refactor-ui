import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CenterComponent} from "./center/center.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {AirportResolver} from "../../core/resolver/airport.resolver";

const routes: Routes = [{
  path: '', component: CenterComponent,
  children: [
    {
      path: 'schedule', component: ScheduleComponent, resolve: { airports: AirportResolver }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
