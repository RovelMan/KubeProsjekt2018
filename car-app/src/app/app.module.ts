import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { SearchTripsComponent } from './components/search-trips/search-trips.component';
import { MakeTripComponent } from './components/make-trip/make-trip.component';
import { RegisterComponent } from './components/register/register.component';
import { ThisTripComponent } from './components/this-trip/this-trip.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidateService } from './services/validate.service';



const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'profile', component: MyProfileComponent}
]

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
    NavComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
