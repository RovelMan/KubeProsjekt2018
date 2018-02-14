import { Component, OnInit } from '@angular/core';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {

  passengerId: String;
  myTripsPassenger: any;
  myTripsDriver: any;

  constructor(private tripHandler: TripHandlerService, private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.findMyTripsPassenger();
    this.findMyTripsDriver();
    
  }

  findMyTripsPassenger() {
    this.authService.getProfile().subscribe(profile => {
      this.passengerId = profile.id;

      const findMyTripsInput = {
        passengerId: this.passengerId
      }

      this.tripHandler.findMyTripsAsPassenger(findMyTripsInput).subscribe(data => {
        if (data.success) {

          this.myTripsPassenger = data.tripsFound;
        } else {
          this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    },
      //Uncertain if we need this error check, but think it's good practice.
      err => {
        console.log(err);
        return false;
      });


  }


  findMyTripsDriver() {
    this.authService.getProfile().subscribe(profile => {
      this.passengerId = profile.id;

      const findMyTripsInput = {
        passengerId: this.passengerId
      }

      this.tripHandler.findMyTripsAsDriver(findMyTripsInput).subscribe(data => {
        if (data.success) {

          this.myTripsDriver = data.tripsFound;
        } else {
          this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    },
      //Uncertain if we need this error check, but think it's good practice.
      err => {
        console.log(err);
        return false;
      });


  }


}
