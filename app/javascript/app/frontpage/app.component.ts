import { Component } from '@angular/core'; 
import { AuthService } from './services/auth.service';
import { UserData } from 'angular2-token';
import AppHTML from './templates/app.html';
import './styles/app.component.sass';

@Component({
  selector: 'konk-app',
  template: AppHTML
})

export class AppComponent {
  show_form: boolean = false;
  user_logged_in: boolean = false;
  constructor(
    private _authServ: AuthService
  ) {
    this._authServ.userSignedIn$.subscribe(
      res => { this.user_logged_in = res; }
    )
    console.log("Bruger er logged ind: " + this.user_logged_in);
  }


}
