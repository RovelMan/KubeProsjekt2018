import { Component, OnInit } from '@angular/core';


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


  constructor() { }

  ngOnInit() {
  }

  onClickSubmit() {
    const trip = {
      fromDest: this.fromDest,
      toDest: this.toDest,
      maxPassengers: this.maxPassengers,
      date: this.date,
      carModel: this.carModel,
      carFuel: this.carFuel,
      otherInfo: this.otherInfo,
      animals: this.animals,
      childSeat: this.childSeat
      //functionalities: 
    }
    console.log(this.childSeat);
  }

 
  onClickSave() {
    console.log('Save');
  }

  

}
