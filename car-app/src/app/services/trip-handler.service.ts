import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthServiceChatService } from './auth-service-chat.service'
import { Trip } from '../../../models/trip.model';
import { Router } from '@angular/router';
import { snapshotChanges } from 'angularfire2/database';
@Injectable()
export class TripHandlerService {
  
  id: String;
  trips: FirebaseListObservable<Notification[]>;
  trip: Trip;
  user: firebase.User;
  passengerIds: any;
  driverTrips: any;
  firebaseTrips: FirebaseListObservable<Trip[]>;
  firebaseTrip: Trip;


  constructor( private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private router: Router,
    private http: Http,
    private authServiceChat: AuthServiceChatService) {
      this.afAuth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;
          console.log('hooray'); }
    });
  }
 //Firebase
  getTrips(): FirebaseListObservable<Notification[]> {
    const path = `/trips/`;
    console.log('fetching trip in triphandler');
    // query to create our message feed binding
    return this.db.list(path);
    
    
  }
  
  addTripFirebase(trip) : String {
    
    const path = `/trips`;
    this.trips = this.getTrips();
    var newRef = this.trips.push(trip);
    return newRef.key;
  }

  findTripFromDestToDest(trip){
    const path = `/trips/`;
    return this.db.list(path, {query: {orderByChild: 'fromTo', equalTo: trip.from+':'+trip.to}});
    
  }

  findTripById(id) {
    const path = `/trips/${id.tripId}`; 
    return this.db.object(path);

  }

  joinTrip(id): void {
    
    const path = `/trips/${id.tripId}/passengerIds/`;
    this.passengerIds = this.db.list(path);
    this.passengerIds.push(this.user.uid);
    this.addTripToUser(id, 'passengerTrips');
  }
  deleteTrip(id): Promise<void> {
    const path = `/trips/${id.tripId}`;
    return this.db.object(path).remove();
  }

  findValuesInUserChildArray(child) {
    const path=`/users/${this.user.uid}/${child}/`;
    return firebase.database().ref(path).once('value').then(function(snapshot) {
      let returnArr = [];
      snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val(); 
        //item.key = childSnapshot.key;
        returnArr.push(item);
    });
      console.log(returnArr);
      return returnArr;
    })
  }

  addTripToUser(trip, tripType) {
    const path = `/users/${this.user.uid}/${tripType}/`;
    this.driverTrips = this.db.list(path);
    this.driverTrips.push(trip.tripId);
  }

  findValuesInTripChildArray(child, key) {
    const path=`/trips/${key}/${child}/`;
    return firebase.database().ref(path).once('value').then(function(snapshot) {
      let returnArr = [];
      snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val(); 
        //item.key = childSnapshot.key;
        returnArr.push(item);
    });
      console.log(returnArr);
      return returnArr;
    })
  }

  
}
