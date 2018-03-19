import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: Observable<firebase.User>;
  userEmail: string;
  name: string;

  constructor(
    private authServiceChat: AuthServiceChatService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    if (this.authServiceChat.authUser !== undefined) {
      this.user = this.authServiceChat.authUser();
      this.user.subscribe(user => {
        if (user) {
          this.userEmail = user.email;
          this.name = user.displayName;
        }
      });
    }
  }
}
