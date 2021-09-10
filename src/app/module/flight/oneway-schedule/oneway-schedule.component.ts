import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FlightService} from "../../../core/service/flight.service";
import {SearchFlightModel} from "../../../core/model/search-flight-model";
import {FlightSchedule} from "../../../core/entity/flight-schedule";
import {Subscription} from "rxjs";
import { addDays } from 'date-fns';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailScheduleComponent} from "../detail-schedule/detail-schedule.component";

@Component({
  selector: 'app-oneway-schedule',
  templateUrl: './oneway-schedule.component.html',
  styleUrls: ['./oneway-schedule.component.scss']
})
export class OnewayScheduleComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @Input() flightSearch: SearchFlightModel;
  @Output() sel = new EventEmitter<FlightSchedule>();

  // Constant
  readonly DAY_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  // display support properties
  branchImages: string[] = this.flightService.branchImages;
  isHidden: boolean[] = [];
  buttonChange: string[] = [];
  changeStyle = false;
  dateFlightString = new Array<string>(5);
  isActive = new Array<boolean>(5);

  // binding properties
  flightSchedules: FlightSchedule[] = [];
  dateFlight = new Array<Date>(5);
  dateString: string = "";
  depString: string = "";
  arrString: string = "";


  // Subcription
  private sub: Subscription[] = [];
  constructor(
    private flightService: FlightService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.searchFlightSchedule();
    this.setDate(this.flightSearch.depDate);
    this.changeFlightDate();
  }

  searchFlightSchedule() {
    this.sub[0] = this.flightService.search(this.flightSearch).subscribe(
      (data: FlightSchedule[]) => {
        this.flightSchedules = data;
        if (this.flightSchedules.length > 0) {
          for (let i = 0; i < this.flightSchedules.length; i++) {
            this.isHidden.push(true);
            this.buttonChange.push('Chọn');
          }
          this.depString = `${this.flightSchedules[0].departureAirport.city}, Việt Nam (${this.flightSchedules[0].departureAirport.code}) `;
          this.arrString = `${this.flightSchedules[0].arrivalAirport.city}, Việt Nam (${this.flightSchedules[0].arrivalAirport.code}) `;
        }
      }
    );
  }

  changeFlightDate(i: number = 0) {
    this.flightSearch.depDate = this.dateFlight[i];
    this.searchFlightSchedule();
    for (let j = 0; j < 5; j++) {
      this.isActive[j] = j === i;
    }
  }

  setDate(_date: Date) {
    for (let i = 0; i < this.dateFlight.length; i++) {
      const temp = addDays(new Date(_date), i);
      this.dateFlight[i] = temp;
      this.dateFlightString[i] = `${this.DAY_OF_WEEK[temp.getDay()]}(${temp.getDate()}/${temp.getMonth() + 1})`;
    }
  }

  select(i: number) {
    if (this.buttonChange[i] === 'Chọn') {
      this.buttonChange[i] = 'Thay đổi';
      this.changeStyle = true;
      for (let index = 0; index < this.isHidden.length; index++) {
        if (index !== i) {
          this.isHidden[index] = false;
        }
      }
      this.sel.emit(this.flightSchedules[i]);
    } else {
      this.buttonChange[i] = 'Chọn';
      this.changeStyle = false;
      for (let index = 0; index < this.isHidden.length; index++) {
        this.isHidden[index] = true;
      }
      // @ts-ignore
      this.sel.emit(null);
    }
  }

  detail(i: number) {
    const modalRef = this.modalService.open(DetailScheduleComponent, { size: 'lg' });
    modalRef.componentInstance.flightDetail = this.flightSchedules[i];
  }

  ngOnDestroy() {
    this.sub.forEach(val => val.unsubscribe());
  }

}
