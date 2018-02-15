import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TripHandlerService {
  trip: any;
  id: String;
  constructor(private http:Http) { }

  addTrip(trip){
    console.log('In service-trip-handler');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/addtrip', trip, {headers: headers})
      .map(res => res.json());
  }

  findTripFromDest(trip){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/findtrips', trip, {headers: headers}) 
      .map(res => res.json());
  }

  findMyTripsAsPassenger(findMyTripsInput) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/findmytripsaspassenger', findMyTripsInput, {headers: headers}) 
      .map(res => res.json());
  }

  findMyTripsAsDriver(findMyTripsInput) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/findmytripsasdriver', findMyTripsInput, {headers: headers}) 
      .map(res => res.json());
  }

  joinTrip(joinTripInput) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/jointrip', joinTripInput, {headers: headers}) 
      .map(res => res.json());
  }

  deleteTrip(deleteTripInput) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/trips/deletetrip', deleteTripInput, {headers: headers}) 
      .map(res => res.json());
  }

}
