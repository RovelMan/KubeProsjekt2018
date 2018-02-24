import { Component, OnInit } from '@angular/core';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar-chat',
  templateUrl: './navbar-chat.component.html',
  styleUrls: ['./navbar-chat.component.css']
})
export class NavbarChatComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  constructor(private authServiceChat: AuthServiceChatService) { }

  ngOnInit() {
    this.user = this.authServiceChat.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email
      }
      
    })
  }

}
