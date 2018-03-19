import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthServiceChatService } from './auth-service-chat.service'
import { Notification } from '../../../models/notification.model';

@Injectable()
export class NotificationsHandlerService {
  
  notifications: FirebaseListObservable<Notification[]>;
  notification: Notification;
  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private router: Router,
    private http: Http,
    private authServiceChat: AuthServiceChatService,
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        console.log('hooray');
      }
      
    });
    

  }

  addNotification(notification){
    console.log('In notifications-trip-handler');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notifications/addNotification', notification, {headers: headers})
      .map(res => res.json());
  }

  findMyNotifications(userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notifications/findMyNotifications', userId, {headers: headers}) 
      .map(res => res.json());
  }




  //firebase
  getNotifications(): FirebaseListObservable<Notification[]> {
    const path = `/users/${this.user.uid}/notifications/`;
    console.log('fetching notif in handler');
    // query to create our message feed binding
    return this.db.list(path);
    
    
  }
  
  addNotificationFirebase(notification): void {
    
    const path = `/users/${this.user.uid}/notifications`;
    this.notifications = this.getNotifications();
    this.notifications.push(notification);
  }
}
