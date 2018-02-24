import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../../../models/chat-message.model';
import { Observable } from 'rxjs/observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthServiceChatService } from '../../services/auth-service-chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: String = '';
  userName: String;
  messageContent: String;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: String = '';


  
  
  constructor(private authServiceChat: AuthServiceChatService) {
     
      authServiceChat.authUser().subscribe(user => {
        if (user) {
          this.ownEmail = user.email;
          this.isOwnMessage = this.ownEmail === this.userEmail;
        }
        
      });
    
    
  }
  
  ngOnInit(chatMessage = this.chatMessage) {
      this.messageContent = chatMessage.message;
      this.timeStamp = chatMessage.timeSent;
      this.userEmail = chatMessage.email;
      this.userName = chatMessage.userName;
  }

}
