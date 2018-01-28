import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';



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
  
  constructor(
    private validateService:ValidateService, 
    private flashMessage: FlashMessagesService
    ) 
    { }

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
      baggageSpace: this.baggageSpace,
      pictureChoice: this.pictureChoice,
      pictureFile: this.pictureFile
      //functionalities: 
    }
    console.log(this.pictureFile);

    if (!this.validateService.validateMakeTrip(trip)) {
      this.flashMessage.show("Please fill in all fields or add a picture.", {cssClass: 'alert-danger', timeout: 2000});
      return false
    } 
  }

 
  onClickSave() {
    console.log('Save');
  }

  checked() {
    return this.pictureChoice=="uploadFile";
  }

  onFileChange(fileInput: any){
    this.pictureFile = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.pictureFile = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  }

  fileExists() {
    const file = this.pictureFile;
    return (file!=undefined);
  }

  
}

  

  


