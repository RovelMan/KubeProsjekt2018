import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';
@Injectable()
export class NotificationsHandlerService {

  constructor(private http:Http) { }

  addNotification(notification){
    console.log('In notifications-trip-handler');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notifications/addNotification', notification, {headers: headers})
      .map(res => res.json());
  }
}
