import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MapComponent } from './components/map/map.component';

import { TripHandlerService } from './services/trip-handler.service';
import { ResultsComponent } from './components/results/results.component';
import { FilterComponent } from './components/filter/filter.component';
import { UserHandlerService } from './services/user-handler.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesHandlerService } from './services/messages-handler.service';

import { FormWizardModule } from 'angular2-wizard';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  {path:'', component: HomeComponent}, //må sørge for at alle sider blir ført hit
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'my-trips', component: MyTripsComponent, canActivate: [AuthGuard]}, //Add canActivate to protect paths
  {path:'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path:'make-trip', component: MakeTripComponent},
  {path:'search-trip', component: SearchTripsComponent},
  {path:'this-trip', component: ThisTripComponent}
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
    SearchBarComponent,
    MapComponent,
    ResultsComponent,
    FilterComponent,
    MessagesComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ6bgMFGFSNMn9ygEip7Gwg9gPvOV42nY',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    FormWizardModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  
  providers: [ValidateService, AuthService, AuthGuard, TripHandlerService, UserHandlerService, MessagesHandlerService, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
