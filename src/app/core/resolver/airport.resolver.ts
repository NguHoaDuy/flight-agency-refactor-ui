import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {FlightService} from "../service/flight.service";
import {Airport} from "../entity/airport";

@Injectable({
  providedIn: 'root'
})
export class AirportResolver implements Resolve<Airport[]> {

  constructor(
    private flightService: FlightService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Airport[] | Observable<Airport[]> | Promise<Airport[]>  {
    if (this.flightService.airportList.length != 0)
      return this.flightService.airportList;
    return this.flightService.getAirports();
  }
}
