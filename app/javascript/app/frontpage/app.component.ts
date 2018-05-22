import { Component } from '@angular/core';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import AppHTML from './templates/app.html';
import 'rxjs/add/operator/map';
import './styles/app.component.sass';

@Component({
  selector: 'app',
  template: AppHTML
})
export class AppComponent {
  signed_in: boolean;
  output: any;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  constructor(
    private _tokenService: Angular2TokenService,
    private _fb: FormBuilder
  ) {
    this._tokenService.init({validateTokenPath: "/auth/validate_token"});
    this.signed_in = this._tokenService.userSignedIn();
    this.loginForm = _fb.group({
      "email": [""],
      "password": [""]
    })
    this.email = this.loginForm.controls["email"];
    this.password = this.loginForm.controls["password"];
  }

  isUserLoggedIn() {
    return this._tokenService.userSignedIn();
  }

  logOut() {
    this._tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }

  logInSubmit(control: FormControl): void { //hvorfor FormControl?
    this.output = null;
    this._tokenService.signIn({
      email: control.value.email,
      password: control.value.password,
    }).subscribe(
      res => {
        // this.registerData = <RegisterData>{};
        // localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
        this.output       = res;
        console.log(res);

      }, error => {
        // this.registerData = <RegisterData>{};
        this.output       = error;
        console.log(error);
      },
      () => { this.signed_in = this._tokenService.userSignedIn() }
        
    );
  }
}
