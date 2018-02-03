import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrls: ['./search-trips.component.css']
})
export class SearchTripsComponent implements OnInit {
  searchFormP: any;

  //Fetching parameters from URL
  searchFromRoute: string;
  searchToRoute: string;
  searchPassengersRoute: string;
  searchDateRoute: string;


  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.searchFromRoute = this.route.snapshot.params['fromParameter'];
    this.searchToRoute = this.route.snapshot.params['toParameter'];
    this.searchPassengersRoute = this.route.snapshot.params['passengerParameter'];
    this.searchDateRoute = this.route.snapshot.params['dateParameter'];
  }

  onInputChanged(form: any) {
    this.searchFormP = form;
  }

  public textSet() {
    return this.searchFormP != null;
  }

}