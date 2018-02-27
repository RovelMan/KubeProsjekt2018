import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TripHandlerService } from '../../services/trip-handler.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Trip } from '../../../../models/trip.model';
@Component({
  selector: 'app-this-trip',
  templateUrl: './this-trip.component.html',
  styleUrls: ['./this-trip.component.css']
})
export class ThisTripComponent implements OnInit {

  theId: string;
  theTrip: any = 5;
  passengerId: string = "";
  passengerIds: string[]=[];

  constructor(
    private route: ActivatedRoute,
    private tripHandler: TripHandlerService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    /*
    if (this.authService.loggedIn()) {

      this.authService.getProfile().subscribe(profile => {
        this.passengerId = profile.id;
      },
        //Uncertain if we need this error check, but think it's good practice.
        err => {
          console.log(err);
          return false;
        });
    }
     */
    this.theId = this.route.snapshot.params['tripId'];
    this.findTheTripById(this.theId);
    this.findThePassengerIds();
    console.log(this.theId);
   
  }

  findTheTripById(theIdInput) {
    const findTripByIdInput = {
      tripId: theIdInput
    }
    this.tripHandler.findTripById(findTripByIdInput).subscribe(data => {
      this.theTrip = data;
      console.log(this.theTrip);
    });
  }
  findThePassengerIds() {
    console.log(this.theId);
    this.tripHandler.findValuesInTripChildArray('passengerIds', this.theId).then(resolve => {
      this.passengerIds = resolve;
      console.log(this.passengerIds);
    })
  }
 

  joinTrip(tripClickedId) {
     
      const joinTripInput = {
        tripId: tripClickedId
      }
      this.tripHandler.joinTrip(joinTripInput);
    } 
  

}
