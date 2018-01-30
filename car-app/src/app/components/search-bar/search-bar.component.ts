import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var google;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild("searchFrom") searchFromElementRef: ElementRef;
  @ViewChild("searchTo") searchToElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocompleteOne = new google.maps.places.Autocomplete(this.searchFromElementRef.nativeElement, {
        types: ["geocode"]
      });
      let autocompleteTwo = new google.maps.places.Autocomplete(this.searchToElementRef.nativeElement, {
        types: ["geocode"]
      });
    });
  }

  private searchDestination(searchFrom: string, searchTo: string) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);
    this.mapsAPILoader.load().then(() => {
      var request = { origin: searchFrom, destination: searchTo, travelMode: 'DRIVING' }
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    });
  }
}
