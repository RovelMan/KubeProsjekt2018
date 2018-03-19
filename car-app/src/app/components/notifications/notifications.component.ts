import { Component, OnInit, OnChanges } from '@angular/core';
import { NotificationsHandlerService } from '../../services/notifications-handler.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Observable } from 'rxjs/observable';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Notification } from '../../../../models/notification.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnChanges {
  userId: String;
  myNotifications: any = [];
  notifications: FirebaseListObservable<Notification[]>;
  user: firebase.User

  constructor(
    private notificationsHandler: NotificationsHandlerService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private afAuth: AngularFireAuth,
    private authServiceChat: AuthServiceChatService
  ) { 
    
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.fetchNotifications();
    };
    setTimeout(() => {this.notifications = this.notificationsHandler.getNotifications()}, 1000); // Not a viable solution, but works for now.
  }
  ngOnChanges() {
    this.notifications=this.notificationsHandler.getNotifications();

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

  addNotificationFirebase() {
    const notification = {
      type: 'madeTrip',
      //userIds: [this.userId],
      date: Date.now(),
      data: {
        text: 'hello there'
      }
    }  
    this.notificationsHandler.addNotificationFirebase(notification);

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