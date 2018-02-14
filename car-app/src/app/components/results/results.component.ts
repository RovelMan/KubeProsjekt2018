import { Component, OnChanges, ElementRef, NgZone, Input} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  
  @Input() searchForm: any;
  resultsArray: any;
  passengerId: string;

  constructor(
    private tripHandler: TripHandlerService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.passengerId = profile.id;
    },
      //Uncertain if we need this error check, but think it's good practice.
      err => {
        console.log(err);
        return false;
      });
  }


  ngOnChanges() {
    this.findTrips(this.searchForm);
      setTimeout(() => {
        console.log("Outside", this.resultsArray);
      }, 100);
  }

  findTrips(trip: any) {
    const thisTrip = {
      from: trip.fromText,
      to: trip.toText
    }
    this.tripHandler.findTripFromDest(thisTrip).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You have now found all available trips", { cssClass: 'alert-success', timeout: 3000 });
        this.resultsArray = data.tripsFound;
        console.log("Inside", this.resultsArray);
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  joinTrip(tripClickedId) {

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
  }

}
