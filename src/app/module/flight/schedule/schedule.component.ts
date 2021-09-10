import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {OneWayDirective} from "../one-way.directive";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Airport} from "../../../core/entity/airport";
import {FlightSchedule} from "../../../core/entity/flight-schedule";
import {OnewayScheduleComponent} from "../oneway-schedule/oneway-schedule.component";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlightService} from "../../../core/service/flight.service";
import {compare} from "../../../core/validation/validation";
import {SearchFlightModel} from "../../../core/model/search-flight-model";

@Component({
  selector: 'app-flight-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChildren(OneWayDirective) entry: QueryList<OneWayDirective>;

  readonly MAX_PEOPLE = new Array(6);

  searchForm: FormGroup = this.fb.group({
    sortBy: [''],
    isRoundTrip: [''],
    departure: [1, [Validators.required]],
    arrival: [12, [Validators.required]],
    depDate: [new Date(), [Validators.required]],
    retDate: [{ value: new Date(), disabled: true }],
    babies: [0, [Validators.required]],
    children: [0, [Validators.required]],
    adults: [1, [Validators.required]]
  }, {
    validators: [compare]
  });

  airportList: Airport[] = [];
  depId = -1;
  arrId = -1;
  errors = '';
  today = new Date();
  // selected flight
  // @ts-ignore
  private departureFlight: FlightSchedule = null;
  // @ts-ignore
  private departureComponent: ComponentRef<OnewayScheduleComponent>;
  // @ts-ignore
  private returnFlight: FlightSchedule = null;
  // @ts-ignore
  private returnComponent: ComponentRef<OnewayScheduleComponent>;
  private noOfWay: number = 1;

  constructor(
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.airportList = data.airports;
    });
  }

  ngAfterViewInit() {
    this.searchForm.patchValue({
      sortBy: '',
      isRoundTrip: this.flightService.searchFlightForm.isRoundTrip,
      departure: this.flightService.searchFlightForm.departureAirport,
      arrival: this.flightService.searchFlightForm.arrivalAirport,
      depDate: this.flightService.searchFlightForm.departureDateTime,
      retDate: this.flightService.searchFlightForm.arrivalDateTime,
      babies: this.flightService.searchFlightForm.babies,
      children: this.flightService.searchFlightForm.children,
      adults: this.flightService.searchFlightForm.adults,
    });
    this.onSubmit();
  }

  onSubmit() {
    const depSchedule: SearchFlightModel = {
      sortBy: this.sortBy?.value,
      departure: this.departure?.value,
      arrival: this.arrival?.value,
      depDate: this.depDate?.value,
      babies: this.babies?.value,
      children: this.children?.value,
      adults: this.adults?.value
    };
    this.noOfWay = 1;
    this.departureComponent = this.loadComponent(0, depSchedule);
    this.departureComponent.instance.sel.subscribe(data => {
      this.departureFlight = data;
    });
    if (this.isRoundTrip?.value === '1') {
      const retSchedule: SearchFlightModel = {
        sortBy: this.sortBy?.value,
        departure: this.arrival?.value,
        arrival: this.departure?.value,
        depDate: this.retDate?.value,
        babies: this.babies?.value,
        children: this.children?.value,
        adults: this.adults?.value
      };
      this.noOfWay = 2;
      this.returnComponent = this.loadComponent(1, retSchedule);
      this.returnComponent.instance.sel.subscribe(data => {
        this.returnFlight = data;
      });
    }
  }

  loadComponent(index: number, flightSearch: SearchFlightModel): ComponentRef<OnewayScheduleComponent> {
    // clear component
    this.entry.toArray()[index].viewContainer.clear();
    const resolver = this.resolver.resolveComponentFactory(OnewayScheduleComponent);

    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolver);
    componentRef.instance.flightSearch = flightSearch;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  changeWay($event: any) {
    if ($event.target.value === '') {
      this.retDate?.disable();
    } else {
      this.retDate?.enable();
    }
  }

  get selectedDep() {
    return this.departureFlight != null;

  }

  get selectedRet() {
    if (this.noOfWay === 1) {
      return true;
    }
    return this.returnFlight != null;
  }

  get sortBy() {
    return this.searchForm.get('sortBy');
  }

  get babies() {
    return this.searchForm.get('babies');
  }
  get children() {
    return this.searchForm.get('children');
  }

  get adults() {
    return this.searchForm.get('adults');
  }
  get departure() {
    return this.searchForm.get('departure');
  }

  get arrival() {
    return this.searchForm.get('arrival');
  }

  get depDate() {
    return this.searchForm.get('depDate');
  }

  get retDate() {
    return this.searchForm.get('retDate');
  }

  get isRoundTrip() {
    return this.searchForm.get('isRoundTrip');
  }

  confirmBooking() {
/*
    this.bookingService.departureFlight = this.departureFlight;
    this.bookingService.bookingInfo = this.searchForm.value;
    if (this.noOfWay === 2) {
      const isValid = checkInterval(this.returnFlight.departureDateTime, this.departureFlight.departureDateTime, 240);
      if (isValid) {
        this.bookingService.returnFlight = this.returnFlight;
        this.errors = '';
      } else {
        this.errors = 'Thời gian giữa hai chuyến bay cách nhau ít nhất 4h. Vui lòng chọn lại.';
        return;
      }
    }
    this.modalService.open(FlightBookingDetailComponent, { size: 'lg' });
*/
  }
}
