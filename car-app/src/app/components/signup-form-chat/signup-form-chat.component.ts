import { Component, OnInit } from '@angular/core';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup-form-chat',
  templateUrl: './signup-form-chat.component.html',
  styleUrls: ['./signup-form-chat.component.css']
})
export class SignupFormChatComponent {

  email: string;
  password: string;
  displayName: string;
  errormsg: string;

  constructor(private authServiceChat: AuthServiceChatService,
  private router: Router) { }
  
  signUp() {
    const email =  this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authServiceChat.signUp(email, password, displayName) //returns a promise
      .then(resolve => this.router.navigate(['chat']))
      .catch(error => this.errormsg = error.message);
  }
  

}
