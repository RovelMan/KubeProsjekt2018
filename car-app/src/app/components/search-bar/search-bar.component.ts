import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { request } from 'https';
declare var google;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild("searchFrom") searchFromElementRef: ElementRef;
  @ViewChild("searchTo") searchToElementRef: ElementRef;z

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
  }

  private searchDestination() {
    console.log("im in");
    this.mapsAPILoader.load().then(() => {
      var from;
      var to;

      var map;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      map = new google.maps.Map(document.getElementById('map'));
      directionsDisplay.setMap(map);

      let autocompleteOne = new google.maps.places.Autocomplete(this.searchFromElementRef.nativeElement, {
        types: ["geocode"]
      });
      let autocompleteTwo = new google.maps.places.Autocomplete(this.searchToElementRef.nativeElement, {
        types: ["geocode"]
      });

      autocompleteOne.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteOne.getPlace();
          from = place.name;
        });
      });

      autocompleteTwo.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteTwo.getPlace();
          to = place.name;
        });
      });

      var request = {
        origin: from,
        destination: to,
        travelMode: 'DRIVING'
      }

      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    });
  }
}
