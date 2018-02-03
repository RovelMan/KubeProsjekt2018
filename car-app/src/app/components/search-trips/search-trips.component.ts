import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-trips',
  templateUrl: './search-trips.component.html',
  styleUrls: ['./search-trips.component.css']
})
export class SearchTripsComponent implements OnInit {
  searchFormP: any;
  searchFromRoute: string;

  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.searchFromRoute = this.route.snapshot.params['fromParameter'];
  }

  onInputChanged(form: any) {
    this.searchFormP = form;
  }

  public textSet() {
    return this.searchFormP != null;
  }

}