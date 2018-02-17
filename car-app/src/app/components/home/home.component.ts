import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trip: any
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  


}
