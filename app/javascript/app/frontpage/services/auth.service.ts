import { Injectable, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

@Injectable()

export class AuthService {
  
  
  constructor(
    private _token: Angular2TokenService
  ) { }


  init(options: any): void {
    this._token.init(options);
  }

  isUserLoggedIn() {
    return this._token.userSignedIn();
  }

  logUserIn(form: FormControl): void {
    this._token.signIn({
      email: form.value.email,
      password: form.value.password,
    }).subscribe(
      res => {
        // this.registerData = <RegisterData>{};
        console.log(res);
      }, error => {
        // this.registerData = <RegisterData>{};
        console.log(error);
      }
    );
  }

  logUserOut(): void {
    this._token.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }

}

