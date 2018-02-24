import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: firebase.User
  displayName: string;
  email: string;
  constructor() { }
  
  ngOnInit(user = this.user) {
    this.displayName = user.displayName;
    this.email = user.email;
  
}

}
