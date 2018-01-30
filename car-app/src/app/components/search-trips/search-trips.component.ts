import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrls: ['./search-trips.component.css']
})
export class SearchTripsComponent implements OnInit {
  searchFormP: any;

  constructor() {}

  ngOnInit() {

  }

  onInputChanged(form: any) {
    this.searchFormP = form;
  }

  public textSet() {
    return this.searchFormP != null;
  }

}
