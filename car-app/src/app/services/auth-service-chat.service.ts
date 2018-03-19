import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable()
export class AuthServiceChatService {
  private user: Observable<firebase.User>
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private router: Router
  ) {
      this.user= afAuth.authState;
     }
  authUser() {
    return this.user;
  }
  get currentUserId(): string {
    return this.authState !==null ? this.authState.uid : '';
  }
  login(email: string, password: string) {
    console.log('in login in authservice')
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user;
      this.setUserStatus('online');
      this.router.navigate(['/my-trips']);
    });
  }

  signUp( email: string, password: string, displayName: string) {
    console.log('about to sign up')
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user;
      const status = 'online';
      this.setUserData(email, password, displayName);
    }).catch(error => console.log(error));
  }

  setUserData(email: string, status: string, displayName: string): void {
    
    //set Status
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    }
    this.db.object(path).update(data)
    .catch(error => console.log(error));
    
    //set DisplayName and photourl
    firebase.auth().currentUser.updateProfile( {
      displayName: displayName,
      photoURL: "" //must have photoURL with this function.
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    
    //set email
    firebase.auth().currentUser.updateEmail(email).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    
    


  }

  setUserStatus(status: string): void {
    console.log('in setuserstatus in authservice')

    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data)
        .catch(error => console.log(error));
    
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  
  loggedIn() : Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => { 
        if (!authenticated) {
          return false;
        }
      } );
  }


}
