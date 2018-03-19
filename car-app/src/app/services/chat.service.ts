import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthServiceChatService } from '../services/auth-service-chat.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../../../models/chat-message.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      if (this.user) {
        this.getUser().subscribe(a => {
          this.userName = a.displayName;
        });
      }
      
    });

  }

  getUser() {
    if (this.user) {
      const userId = this.user.uid;
      const path = `/users/${userId}`;
      return this.db.object(path);
    }
    
  }


  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }


  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    const userName = this.user.displayName;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: userName,
      email: email
    });
  }

  getMessages(): FirebaseListObservable<ChatMessage[]> {
    // query to create our message feed binding
    return this.db.list('/messages', {query: {limitToLast: 10}});
    
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }
}