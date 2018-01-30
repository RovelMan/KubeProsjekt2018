import { Component, OnInit, ElementRef, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
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
  @Output() inputChanged: EventEmitter<any> = new EventEmitter<any>();

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
    const form = {
      fromText: searchFrom,
      toText: searchTo
    }
    this.inputChanged.emit(form);
  }
}
