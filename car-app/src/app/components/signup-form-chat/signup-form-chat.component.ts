import { Component, OnInit } from '@angular/core';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private flashMessage: FlashMessagesService,
  private router: Router) { }
  
  signUp() {
    const email =  this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authServiceChat.signUp(email, password, displayName) //returns a promise
      .then(resolve => {
        if (resolve.code == "auth/invalid-email") {
          this.flashMessage.show("Please fill in a valid email.", {cssClass: 'alert-danger', timeout: 3000})
        }
        else if (resolve.code == "auth/weak-password") {
          this.flashMessage.show("The password is too weak", {cssClass: 'alert-danger', timeout: 3000})
        } 
        else if (resolve.code == "auth/email-already-in-use") {
          this.flashMessage.show("Email already in use", {cssClass: 'alert-danger', timeout: 3000})
        }
       
      })
      .catch(error => {
        this.errormsg = error.message;
      });
  }
  
  

}
