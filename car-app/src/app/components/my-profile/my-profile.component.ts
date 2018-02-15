import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserHandlerService } from '../../services/user-handler.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: Object;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private userHandler: UserHandlerService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  deleteUserProfile() {
    this.userHandler.deleteUserProfile(this.user).subscribe(data => {
      if (data.success) {
        this.authService.logout();
        this.flashMessage.show("Your profile has been deleted.", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/']);
        return false;
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

  }

}
