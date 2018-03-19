import { Component, OnInit, Input } from '@angular/core';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Trip } from '../../../../models/trip.model';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  
  passengerId: String;
  myTripsPassenger: FirebaseObjectObservable<any>[] = [];
  myTripsDriver: FirebaseObjectObservable<any>[] = [];
  //test: Trip;
  //ids: FirebaseListObservable<any[]>;
  listOfIds: IterableIterator<any>;
  myTripsDriverIds: any[];
  myTripsPassengerIds: any[];
  bool: boolean;
  
  constructor(
    private tripHandler: TripHandlerService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.tripHandler.getUser();
    setTimeout(() => {
      this.findTripsAsPassenger();
      this.findTripsAsDriver();
    },600)
    
  }

  deleteTrip(tripClickedId) {
    const deleteTripInput = {
      tripId: '-L6BUUUK11IvjVoai7ls'
    }
    console.log('it is running');
    this.tripHandler.deleteTrip(deleteTripInput)
      .then()
      .catch(err => console.log(err));
  }
  findTripsAsPassenger() {
    this.tripHandler.findValuesInUserChildArray('passengerTrips').then(resolve => {
      this.myTripsPassengerIds = resolve;
      this.findTripsById(this.myTripsPassengerIds, this.myTripsPassenger);
    })
      .catch(err => console.log(err));
  }
  findTripsAsDriver() {
    this.tripHandler.findValuesInUserChildArray('driverTrips').then(resolve => {
      this.myTripsDriverIds = resolve;
      this.findTripsById(this.myTripsDriverIds, this.myTripsDriver);
    })
      .catch(err => console.log(err)
      );
  }
  findTripsById(ids, array) {
    for (let id of ids) {
      id = {
        tripId: id
      }
      this.tripHandler.findTripById(id).subscribe(trip => {
        array.push(trip);
      });
    } 
  }

  /*
  waitUntil(check, onComplete, delay,timeout) {
    // if the check returns true, execute onComplete immediately
    if (check()) {
        onComplete();
        return;
    }
    
    if (!delay) delay=100;
  
    var timeoutPointer;
    var intervalPointer=setInterval(function () {
        if (!check()) return; // if check didn't return true, means we need another check in the next interval
  
        // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
        clearInterval(intervalPointer);
        if (timeoutPointer) clearTimeout(timeoutPointer);
        onComplete();
    },delay);
    // if after timeout milliseconds function doesn't return true, abort
    if (timeout) timeoutPointer=setTimeout(function () {
        clearInterval(intervalPointer);
    },timeout);
  }
  
  check(): boolean {
    console.log(this);
   if (this.myTripsPassengerIds !== undefined) {
     return false;
   } else {
     return true
   }
  }
  */
}
