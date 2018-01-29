import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';


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

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { SearchBarComponent } from './components/search-bar/search-bar.component';





const appRoutes: Routes = [
  {path:'', component: HomeComponent}, //må sørge for at alle sider blir ført hit
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'my-trips', component: MyTripsComponent, canActivate: [AuthGuard]}, //Add canActivate to protect paths
  {path:'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path:'make-trip', component: MakeTripComponent},
  {path:'search-trip', component: SearchTripsComponent}
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
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSxAMpNTwI3G1EYTjTmQrSE_uHOP3gX_M'
    })
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
