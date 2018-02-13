import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  fromDest: String;
  toDest: String;
  numberOfPassengers: Number;
  date: String;

  constructor() { }

  ngOnInit() {
  }

}
