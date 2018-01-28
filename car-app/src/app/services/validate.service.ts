import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user) {
    if (user.name==undefined || user.email==undefined || user.username==undefined || user.password==undefined) {
      return false;
    } else {
      return true;
    }

  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase()); //kan hende må fjerne toLowerCase for tall? 
  }

  validateLogin(user) {
    if (user.username==undefined || user.password==undefined) {
      return false;
    } else {
      return true;
    }
  }

  //may be undefined even though it is there
  validateMakeTrip(trip) {

    if (trip.fromDest==undefined || trip.toDest==undefined || trip.maxPassengers==undefined || trip.date==undefined || trip.carModel==undefined || trip.carFuel==undefined || trip.pictureChoice==undefined || (trip.pictureChoice=="uploadFile" && trip.pictureFile==undefined)) { 
      return false;
    } else {
      return true;
    
    }   
      
  }
}
