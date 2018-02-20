import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService } from '../../services/auth.service';
//import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { NotificationsHandlerService } from '../../services/notifications-handler.service'

declare var google;

@Component({
  selector: 'app-make-trip',
  templateUrl: './make-trip.component.html',
  styleUrls: ['./make-trip.component.css']
})
export class MakeTripComponent implements OnInit {

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

  user: Object;
  userId: String;

  isCompleted: boolean;

  @ViewChild("from") searchFromElementRef: ElementRef;
  @ViewChild("to") searchToElementRef: ElementRef;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private tripHandlerService: TripHandlerService,
    private authService: AuthService,
    private notificationsHandler: NotificationsHandlerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocompleteOne = new google.maps.places.Autocomplete(this.searchFromElementRef.nativeElement, {
        types: ["geocode"]
      });
      let autocompleteTwo = new google.maps.places.Autocomplete(this.searchToElementRef.nativeElement, {
        types: ["geocode"]
      });
    });
  }

  onClickSubmit(from: string, to: string, passengers: number, date: string) {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.userId = profile.id;

        const trip = {
          from: from,
          to: to,
          maxPassengers: passengers,
          date: date,
          driverId: this.userId
        }
        // Register trip
        this.tripHandlerService.addTrip(trip).subscribe(data => {
          if (data.success) {
            this.flashMessage.show("You have now added a trip to the cloud", { cssClass: 'alert-success', timeout: 3000 });
            console.log(data.tripSaved._id);
            this.addNotificationMadeTrip(data.tripSaved._id);
            this.router.navigate(['/my-profile']);


          } else {
            this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/make-trip']);
          }
        });
      },

        //Uncertain if we need this error check, but think it's good practice.
        err => {
          console.log(err);
          return false;
        });
    } else {
      this.flashMessage.show("Not logged in!", { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
  addNotificationMadeTrip(tripId) {
    const notification = {
      type: 'madeTrip',
      userIds: [this.userId],
      date: Date.now(),
      data: {
        tripId: tripId,
      }
    }
    this.notificationsHandler.addNotification(notification).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You have now added a notification", { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
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









