import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TripHandlerService } from '../../services/trip-handler.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-this-trip',
  templateUrl: './this-trip.component.html',
  styleUrls: ['./this-trip.component.css']
})
export class ThisTripComponent implements OnInit {

  theId: string;
  theTrip: any;
  passengerId: any;

  constructor(
    private route: ActivatedRoute,
    private tripHandler: TripHandlerService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {

      this.authService.getProfile().subscribe(profile => {
        this.passengerId = profile.id;
      },
        //Uncertain if we need this error check, but think it's good practice.
        err => {
          console.log(err);
          return false;
        });
    } else {
      this.flashMessage.show("You are not logged in.", { cssClass: 'alert-warning', timeout: 3000 });
    }
    this.theId = this.route.snapshot.params['tripId'];
    this.findTheTripById(this.theId);
  }

  findTheTripById(theIdInput) {
    const findTripByIdInput = {
      tripId: theIdInput
    }
    this.tripHandler.findMyTripById(findTripByIdInput).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Yeah, you just joined a trip !", { cssClass: 'alert-success', timeout: 3000 });
        this.theTrip = data.tripFound;
        console.log(data.tripFound);
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  joinTrip(tripClickedId) {
    if (this.authService.loggedIn()) {
    const joinTripInput = {
      passengerId: this.passengerId,
      tripId: tripClickedId
    }
    this.tripHandler.joinTrip(joinTripInput).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Yeah, you just joined a trip !", { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  } else {
    this.flashMessage.show("You are not logged in.", { cssClass: 'alert-warning', timeout: 3000 });
  }
}

}
