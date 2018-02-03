import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-trip',
  templateUrl: './make-trip.component.html',
  styleUrls: ['./make-trip.component.css']
})
export class MakeTripComponent implements OnInit {
  
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
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    
    ) 
    { }

  ngOnInit() {
  }
  
  onClickSubmit(from: string, to: string) {
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
    console.log(this.pictureFile);

    if (!this.validateService.validateMakeTrip(trip)) {
      this.flashMessage.show("Please fill in all fields or add a picture.", {cssClass: 'alert-danger', timeout: 2000});
      return false;
    } else {
      this.flashMessage.show("Trip uploaded", {cssClass: 'alert-success', timeout: 2000});

      this.router.navigate(['/my-trips']);
      return true;
    
    }
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

  
  

  onFileChange(fileInput: any){
    this.pictureFile = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.pictureFile = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  }

  

  onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector ( "#" + f )
      if ( element ) element.scrollIntoView()
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
  
  
  

  

    


  

  
}

  

  


