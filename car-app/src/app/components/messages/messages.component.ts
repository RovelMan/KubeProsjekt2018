import { Component, OnInit } from '@angular/core';
import { MessagesHandlerService } from '../../services/messages-handler.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userId: String;
  messagesReceived: any;
  messageBox: String;

  constructor(private messageHandler: MessagesHandlerService, private flashMessage: FlashMessagesService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.id;
      this.fetchMessagesReceived();
    },
      //Uncertain if we need this error check, but think it's good practice.
      err => {
        console.log(err);
        return false;
      });


  }
  addMessage() {
    console.log(this.userId);
    const message = {
      senderId: 'abc',
      receiverId: 'def',
      messageText: this.messageBox,
      date: Date.now()  // use this to retrieve date: | date[:format[:timezone[:locale]]]
    }
    this.messageHandler.addMessage(message).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Message has been sent', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong in add message', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  fetchMessagesReceived() {
    const receiver = {
      id: this.userId
    }
    this.messageHandler.findMessagesReceived(receiver).subscribe(data => {
      if (data.success) {
        this.messagesReceived = data.messagesFound;
        this.flashMessage.show("Messages received fetched", { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
