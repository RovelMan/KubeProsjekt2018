import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SearchBarComponent } from '../search-bar/search-bar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  showUsers(){
    this.authService.showUsers();
  }
}
