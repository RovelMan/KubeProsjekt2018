import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  user: Observable<firebase.User>;
  constructor(
    private router:Router,
    private flashMessage:FlashMessagesService,
    private authServiceChat: AuthServiceChatService 
  ) { }

  ngOnInit() {
    if (this.authServiceChat.authUser !== undefined) {
      this.user = this.authServiceChat.authUser();
      this.user.subscribe(user => { });
    }
  }

  onLogoutClick(){
    
    this.authServiceChat.logout();
    this.flashMessage.show('You are logged out', {cssClass:'alert-success', timeout:3000});
    this.router.navigate(['/']);
    return false;
  }
  

}
