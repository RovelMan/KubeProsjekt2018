import { Component, OnChanges, ElementRef, NgZone, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TripHandlerService } from '../../services/trip-handler.service';
import { AuthService } from '../../services/auth.service';
import { MessagesHandlerService  } from '../../services/messages-handler.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {

  @Input() searchForm: any;
  resultsArray: any;
  passengerId: string;
  selectedTripDriverId: string;
  closeResult: string;
  selectedTripId: string;


  constructor(
    private tripHandler: TripHandlerService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private messageHandler: MessagesHandlerService,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {

      this.authService.getProfile().subscribe(profile => {
        this.passengerId = profile.id;
      },
        err => {
          console.log(err);
          return false;
        });
    }

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


  sendMessageToDriver(messageText) {
    console.log(messageText);
    const message = {
      senderId: this.passengerId,
      receiverId: this.selectedTripDriverId,
      messageText: messageText,
      date: Date.now()
    }
    console.log(message);
    this.messageHandler.addMessage(message).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Message has been sent', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong in add message', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  open(thisTrip, content) {
    this.selectedTripDriverId = thisTrip.driverId;
    this.selectedTripId = thisTrip.tripId;

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result.text!=undefined && result.text!="") {
        console.log(result.text);
        this.sendMessageToDriver(result.text); //not working
      } else if (result.text==''){
        this.flashMessage.show('You cannot send an empty message', {cssClass: 'alert-warning', timeout: 3000});
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

