import { Injectable } from '@angular/core';
import {SearchFlightModel} from "../model/search-flight-model";
import {Observable} from "rxjs";
import {FlightSchedule} from "../entity/flight-schedule";
import {HttpClient} from "@angular/common/http";
import {SearchFlightForm} from "../model/dto/search-flight-form";
import {Airport} from "../entity/airport";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private SEARCH_FLIGHT_API = "https://localhost:8090/api/v1/flight/schedule";
  private GET_AIRPORT_API = "https://localhost:8090/api/v1/flight/airport";

  branchImages: string[] = ['',
    'assets/airlines-logo/vnairline.gif',
    'assets/airlines-logo/vietjet.png',
    'assets/airlines-logo/pacific.png',
    'assets/airlines-logo/bamboo.png',
    'assets/airlines-logo/viettravel.png'
  ];
  // @ts-ignore
  searchFlightForm: SearchFlightForm;
  airportList: Airport[] = [];

  constructor(
    private http: HttpClient
  ) { }

  search(flightSearch: SearchFlightModel): Observable<FlightSchedule[]> {
    return this.http.post<FlightSchedule[]>(this.SEARCH_FLIGHT_API, flightSearch);
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.GET_AIRPORT_API);
  }
}
