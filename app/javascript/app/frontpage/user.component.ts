import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UserData } from 'angular2-token';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from './services/auth.service';
import UserHTML from './templates/user.html';
import './styles/user.component.sass';

@Component({
  selector: 'user',
  template: UserHTML
})
export class UserComponent implements OnInit {
  current_user: UserData = null;
  signed_in: boolean;
  output: any;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  constructor(
    private _auth: AuthService,
    private _token: Angular2TokenService,
    private _fb: FormBuilder
  ) {
    this._token.init({validateTokenPath: "/auth/validate_token"});
    this.setForm();
  }

  ngOnInit() {
    if (this._auth.userSignedIn$) { this.setUser(); }
  }

  setUser() {
    this._token.validateToken().subscribe(
      res => { this.current_user = res.json().data },
      err => console.log(err)
    )
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
