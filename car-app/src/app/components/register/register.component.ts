import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    // Required fields
    if (!this.validateService.validateRegister(user)) {
      console.log("Please fill in all fields");
      return false
    }
    if (!this.validateService.validateEmail(this.email)) {
      console.log("Please fill in a valid email.");
      return false;
    }
    console.log("Success");
  }

}
