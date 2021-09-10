import {Component, Input, OnInit} from '@angular/core';
import {FlightService} from "../../../core/service/flight.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FlightSchedule} from "../../../core/entity/flight-schedule";
import {differenceInHours, differenceInMinutes} from "date-fns";

@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.scss']
})
export class DetailScheduleComponent implements OnInit {

  // @ts-ignore
  @Input() flightDetail: FlightSchedule;
  branchImages: string[] = this.flightService.branchImages;
  interval: string | undefined;

  constructor(
    private flightService: FlightService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getInterval();
  }

  getInterval() {
    if (this.flightDetail == null)
      return;
    let hours = differenceInHours(
      new Date(`${this.flightDetail.departureDate} ${this.flightDetail.arrivalTime}`),
      new Date(`${this.flightDetail.departureDate} ${this.flightDetail.departureTime}`)
    );
    let minutes = differenceInMinutes(
      new Date(`${this.flightDetail.departureDate} ${this.flightDetail.arrivalTime}`),
      new Date(`${this.flightDetail.departureDate} ${this.flightDetail.departureTime}`)
    );
    minutes = minutes % 60;
    if (minutes != 0)
      this.interval = `${hours}h ${minutes}ph`;
    else
      this.interval = `${hours}h`;
  }
}
