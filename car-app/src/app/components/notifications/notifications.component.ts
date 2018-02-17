import { Component, OnInit } from '@angular/core';
import { NotificationsHandlerService } from '../../services/notifications-handler.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userId: String;
  myNotifications: any = [];

  constructor(
    private notificationsHandler: NotificationsHandlerService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.fetchNotifications();
    }
    
  }

  fetchNotifications() {

    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.id;

      const user = {
        userId: this.userId
      }

      this.notificationsHandler.findMyNotifications(user).subscribe(data => {
        if (data.success) {
          this.myNotifications = data.notificationsFound;
        } else {
          this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    },
      //Uncertain if we need this error check, but think it's good practice.
      err => {
        console.log(err);
        return false;
      });


  }





}
/*
trip ended
passenger joined
passenger left
trip made (done for now) 
your next trip
trip full
trip closed
trip feedback received




*/