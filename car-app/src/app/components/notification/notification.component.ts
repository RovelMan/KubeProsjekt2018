import { Component, OnInit, Input } from '@angular/core';
import {Notification } from '../../../../models/notification.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
  type: String;
  data: any;
  date: Date;
  constructor() { }

  ngOnInit(notification =this.notification) {
    this.type = notification.type;
    this.data = notification.data;
    this.date = notification.date;
  }

}
