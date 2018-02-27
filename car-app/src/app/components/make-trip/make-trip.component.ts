import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService } from '../../services/auth.service';

import { NotificationsHandlerService } from '../../services/notifications-handler.service'
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user.model';
import { AuthServiceChatService } from '../../services/auth-service-chat.service'


@Component({
  selector: 'app-make-trip',
  templateUrl: './make-trip.component.html',
  styleUrls: ['./make-trip.component.css']
})
export class MakeTripComponent implements OnInit {
  user: firebase.User;
  fromDest: String;
  toDest: String;
  maxPassengers: Number;
  date: String;

  carModel: String;
  carFuel: String;
  otherInfo: String;

  animals: Boolean;
  childSeat: Boolean;
  baggageSpace: Boolean;
  pictureChoice: String;
  pictureFile: File;

  
  userId: String;

  isCompleted: boolean;
  key: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private tripHandlerService: TripHandlerService,
    private authService: AuthService,
    private notificationsHandler: NotificationsHandlerService,
    private afAuth: AngularFireAuth

  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      
    });
  }

  onClickSubmit(from: string, to: string, passengers: number, date: string) {
    const trip = {
      from: from,
      to: to,
      fromTo: from+':'+to,
      date: date,
      maxPassengers: passengers,
      driverId: this.user.uid,
      passengerIds: [],
      messages: []
    }
    this.key = this.tripHandlerService.addTripFirebase(trip);
    this.addNotificationMadeTrip();
    const thisTripId = {
      tripId: this.key
    }
    this.tripHandlerService.addTripToUser(thisTripId, 'driverTrips');
  }
  
  addNotificationMadeTrip() {
    const notification = {
      type: 'madeTrip',
      //userIds: [this.userId],
      date: Date.now(),
      data: {
        driverId: this.user.uid
      }
    }  
    this.notificationsHandler.addNotificationFirebase(notification);

  }




  setFirstField(from: string, to: string, passengers: number, date: string) {
    this.fromDest = from;
    this.toDest = to;
    this.maxPassengers = passengers;
    this.date = date;
    console.log(from, to, passengers, date);
  }

  setSecondField(model: string, animals: boolean, childseat: boolean, baggagespace: boolean) {
    this.carModel = model;
    console.log(model, animals, childseat, baggagespace);
  }

  setThirdField() {
    this.otherInfo = "done";
    console.log(this.otherInfo);
    this.isCompleted = true;
  }

  validateFields() {
    const trip = {

      carModel: this.carModel,
      carFuel: this.carFuel,
      otherInfo: this.otherInfo,

      animals: this.animals,
      childSeat: this.childSeat,
      baggageSpace: this.baggageSpace,
      pictureChoice: this.pictureChoice,
      pictureFile: this.pictureFile
      //functionalities: 
    }



    if (!this.validateService.validateMakeTrip(trip)) {
      return false;
    } else {
      return true;
    }
  }



  onClickSave() {
    const trip = {

      carModel: this.carModel,
      carFuel: this.carFuel,
      otherInfo: this.otherInfo,

      animals: this.animals,
      childSeat: this.childSeat,
      baggageSpace: this.baggageSpace,
      pictureChoice: this.pictureChoice,
      pictureFile: this.pictureFile
      //functionalities: 
    }
    console.log('Save');
    this.router.navigate(['/my-trips']); //Some problems with navigation because of auto scroll
  }




  onFileChange(fileInput: any) {
    this.pictureFile = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.pictureFile = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  }



  onAnchorClick() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f)
      if (element) element.scrollIntoView()
    });
  }

  changePath() {
    const trip = {

      carModel: this.carModel,
      carFuel: this.carFuel,
      otherInfo: this.otherInfo,

      animals: this.animals,
      childSeat: this.childSeat,
      baggageSpace: this.baggageSpace,
      pictureChoice: this.pictureChoice,
      pictureFile: this.pictureFile
    }
    console.log('before if')
  }
}

    /*
    if ( ) { 
      
      //document.getElementById("car-specs").scrollIntoView({behavior: "smooth"});
      return true;
    } else if ((trip.fromDest!=undefined && trip.toDest!=undefined && trip.maxPassengers!=undefined && trip.date!=undefined) && ( trip.carModel!=undefined && trip.carFuel!=undefined) && ( trip.pictureChoice==undefined || (trip.pictureChoice=="uploadFile" && trip.pictureFile==undefined))) { 
      console.log('we are here')
      document.getElementById("extras").scrollIntoView({behavior: "smooth"});
      return true;
      
    } else {
      return false;
    }
    */









