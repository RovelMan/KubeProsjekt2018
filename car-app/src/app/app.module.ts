import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { SearchTripsComponent } from './search-trips/search-trips.component';
import { MakeTripComponent } from './make-trip/make-trip.component';
import { RegisterComponent } from './register/register.component';
import { ThisTripComponent } from './this-trip/this-trip.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyTripsComponent,
    SearchTripsComponent,
    MakeTripComponent,
    RegisterComponent,
    ThisTripComponent,
    MyProfileComponent,
    NavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
