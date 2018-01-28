import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrls: ['./search-trips.component.css']
})
export class SearchTripsComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
