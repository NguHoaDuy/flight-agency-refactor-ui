import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {PassengerTypeDirective} from "../../../shared/directive/passenger-type.directive";
import {Airport} from "../../../core/entity/airport";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {compare} from "../../../core/validation/validation";
import {FlightService} from "../../../core/service/flight.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PassengerTypeComponent} from "../../../shared/layout/passenger-type/passenger-type.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {


  // @ts-ignore
  @ViewChildren(PassengerTypeDirective) entry: QueryList<PassengerTypeDirective>;

  // @ts-ignore
  private adultType: ComponentRef<PassengerTypeComponent>;
  // @ts-ignore
  private childrenType: ComponentRef<PassengerTypeComponent>;
  // @ts-ignore
  private infantType: ComponentRef<PassengerTypeComponent>;

  airportList: Airport[] = [];
  depId = -1;
  arrId = -1;
  today = new Date();

  // @ts-ignore
  searchForm: FormGroup;
  togglePopover: boolean = true;

  constructor(
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver,
    private flightService: FlightService,
    private  router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.data.subscribe((data ) => {
      this.flightService.airportList = data.airports as Airport[];
      this.airportList = this.flightService.airportList;
    });

    this.searchForm = this.fb.group({
      sortBy: [''],
      isRoundTrip: [false],
      departure: [1, [Validators.required]],
      arrival: [2, [Validators.required]],
      depDate: [new Date(), [Validators.required]],
      retDate: [{ value: new Date(), disabled: true }],
      babies: [0, [Validators.required]],
      children: [0, [Validators.required]],
      adults: [1, [Validators.required]]
    }, {
      validators: [compare]
    });
  }

  ngAfterViewInit() {
    this.adultType = this.loadComponent(0, 0);
    this.adultType.instance.amount.subscribe(val => {
      this.adults?.patchValue(val);
    })
    this.childrenType = this.loadComponent(1, 1);
    this.childrenType.instance.amount.subscribe(val => {
      this.children?.patchValue(val);
    })
    this.infantType = this.loadComponent(2, 2);
    this.infantType.instance.amount.subscribe(val => {
      this.babies?.patchValue(val);
    })
  }

  loadComponent(index: number, type: number): ComponentRef<PassengerTypeComponent> {
    // clear component
    this.entry.toArray()[index].viewContainer.clear();
    const resolver = this.resolver.resolveComponentFactory(PassengerTypeComponent);

    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolver);
    componentRef.instance.type = type;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  openPopover() {
    this.togglePopover = !this.togglePopover;
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

  changeWay($event: Event) {
    // @ts-ignore
    if (!$event.target.checked) {
      this.retDate?.disable();
    } else {
      this.retDate?.enable();
    }
  }

  search() {
    this.flightService.searchFlightForm = {
      isRoundTrip: this.isRoundTrip?.value ? '1': '2',
      departureAirport: this.departure?.value,
      arrivalAirport: this.arrival?.value,
      adults: this.adults?.value,
      children: this.children?.value,
      babies: this.babies?.value,
      departureDateTime: this.depDate?.value,
      arrivalDateTime: this.retDate?.value
    };
    console.log(this.flightService.searchFlightForm)
    this.router.navigateByUrl('flight/schedule');
  }


}
