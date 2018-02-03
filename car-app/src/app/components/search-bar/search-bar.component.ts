import { Component, OnInit, ElementRef, NgZone, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { TripHandlerService } from '../../services/trip-handler.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { Router } from '@angular/router';



declare var google;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  //Parameters to be passed to search-trip-component
  searchFromV: string = "";
  searchToV: string = "";
  searchDateV: string = "";
  searchPassengersV: number = 1;

  //Parameters to be set as values in text-boxes
  searchFromInput: string = "";
  searchToInput: string = "";
  searchPassengersInput: string = "";
  searchDateInput: string = "";

  //To receive parameters from parent (search-trip-component)
  @Input() searchFromP: string = "";
  @Input() searchToP: string = "";
  @Input() searchPassengersP: any;
  @Input() searchDateP: any;

  @ViewChild("searchFrom") searchFromElementRef: ElementRef;
  @ViewChild("searchTo") searchToElementRef: ElementRef;
  @Output() inputChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private tripHandlerService: TripHandlerService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocompleteOne = new google.maps.places.Autocomplete(this.searchFromElementRef.nativeElement, {
        types: ["geocode"]
      });
      let autocompleteTwo = new google.maps.places.Autocomplete(this.searchToElementRef.nativeElement, {
        types: ["geocode"]
      });
      if (this.searchFromP != null && this.searchToP != null && this.searchPassengersP != null && this.searchDateP != null) {
        this.searchFromInput = this.searchFromP;
        this.searchToInput = this.searchToP;
        this.searchPassengersInput = this.searchPassengersP;
        this.searchDateInput = this.searchDateP;
        this.searchDestination(this.searchFromInput, this.searchToInput)
      }
    });
  }

  private searchDestination(searchFrom: string, searchTo: string) {
    const form = {
      fromText: searchFrom,
      toText: searchTo
    }
    this.onRegisterSubmit(form);
    if (form.toText != "" && form.fromText != "") {
      this.inputChanged.emit(form);
    }
  }

  private fromBtn() {
    setTimeout(() => {
      this.searchFromV = this.searchFromElementRef.nativeElement.value;
      this.searchToV = this.searchToElementRef.nativeElement.value;
    }, 0.1);
  }

  onRegisterSubmit(form) {

    const trip = {
      from: form.fromText,
      to: form.toText
    }
    // Register user
    this.tripHandlerService.addTrip(trip).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You have now added a trip to the cloud", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/my-profile']);
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      }
    });
  }
}
