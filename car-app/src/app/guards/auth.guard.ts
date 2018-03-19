import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private auth: AngularFireAuth, private router:Router){}



    //This works, from tutorial youtube on angular firebase authentication "https://www.youtube.com/watch?v=O_jxEC0hWcA&t=881s"
    canActivate(): Observable<boolean> {
      return Observable.from(this.auth.idToken)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if 
        (!authenticated) this.router.navigate([ '/login' ]);
      })
    }

}