import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import {UserItemComponent } from '../user-item/user-item.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: FirebaseListObservable<any[]>
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.users = this.chat.getUsers();
  }

}
