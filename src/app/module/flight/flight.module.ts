import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { CenterComponent } from './center/center.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { OneWayDirective } from './one-way.directive';
import { OnewayScheduleComponent } from './oneway-schedule/oneway-schedule.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DetailScheduleComponent } from './detail-schedule/detail-schedule.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "../../app.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CenterComponent,
    ScheduleComponent,
    OneWayDirective,
    OnewayScheduleComponent,
    DetailScheduleComponent
  ],
    imports: [
        CommonModule,
        FlightRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class FlightModule { }
