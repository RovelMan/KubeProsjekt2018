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
  date: Date;
  carModel: String;
  carFuel: String;
  otherInfo: String;
  
  animals: Boolean;
  childSeat: Boolean;
  baggageSpace: Boolean;
  pictureChoice: String;
  pictureFile: File;
  loadFile: File;
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
      childSeat: this.childSeat,
      pictureChoice: this.pictureChoice,
      pictureFile: this.pictureFile
      //functionalities: 
    }
    console.log('submit'); 
  }

 
  onClickSave() {
    console.log('Save');
  }

  checked() {
    return this.pictureChoice=="uploadFile";
  }


  
}

  

  


