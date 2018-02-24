
import { Component, OnInit } from '@angular/core';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-chat',
  templateUrl: './login-chat.component.html',
  styleUrls: ['./login-chat.component.css']
})
export class LoginChatComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authServiceChat: AuthServiceChatService, private router: Router) { }

  login() {
    console.log('login() called from login-form component');
    this.authServiceChat.login(this.email, this.password)
    .catch(error => this.errorMsg = error.message);
  }
}
