import { Component, OnChanges, ElementRef, NgZone, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input() searchForm: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnChanges() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);
    this.mapsAPILoader.load().then(() => {
      var request = { origin: this.searchForm.fromText, destination: this.searchForm.toText, travelMode: 'DRIVING' }
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    });
  }
}
