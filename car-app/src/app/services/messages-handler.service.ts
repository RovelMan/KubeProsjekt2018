import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MessagesHandlerService {

  constructor(private http:Http) { }

  addMessage(message){
    console.log('In service-trip-handler');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/messages/addmessage', message, {headers: headers})
      .map(res => res.json());
  }

  findMessagesReceived(receiver) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/messages/findmessagesreceived', receiver, {headers: headers}) 
      .map(res => res.json());
  }

}
