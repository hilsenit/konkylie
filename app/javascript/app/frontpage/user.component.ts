import { Component } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from './services/auth.service';
import UserHTML from './templates/user.html';
import './styles/user.component.sass';

@Component({
  selector: 'user',
  template: UserHTML
})
export class UserComponent {
  signed_in: boolean;
  output: any;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder
  ) {
    this._auth.init({validateTokenPath: "/auth/validate_token"});
    this.signed_in = this._auth.isUserLoggedIn();
    this.setForm();
  }

  setForm() {
    this.loginForm = this._fb.group({
      "email": [""],
      "password": [""]
    })
    this.email = this.loginForm.controls["email"];
    this.password = this.loginForm.controls["password"];
  }



}
