import { Airport } from './airport';
import { Airline } from './airline';

export interface FlightSchedule{
    id: number,
    departureAirport: Airport
    arrivalAirport: Airport,
    departureDate: string,
    departureTime: string,
    arrivalTime: string,
    airline: Airline,
    flightId: string,
    capacity: number,
    price: number,
    // transactions: Transaction[]
}
