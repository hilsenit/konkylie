import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Angular2TokenService, UserData } from 'angular2-token';

@Injectable()

export class AuthService {
  userSignedIn$: Subject<boolean> = new Subject(); 
  
  constructor(
    private _token: Angular2TokenService
  ) {
    this._token.init({validateTokenPath: "/auth/validate_token"});
    this._token.validateToken().subscribe(
      res => {
        res.status == 200 ? this.userSignedIn$.next(true) : this.userSignedIn$.next(false)
      },
      err => console.log(err)
    )
  }

  validateTokenAndSetUser(): any {
    return this._token.validateToken().subscribe(
      res => {
        if (res.status == 200) {
          return res.json();
        }
      },
      err => console.log(err)
    )
  }

  logUserIn(form: FormControl): void {
    this._token.signIn({
      email: form.value.email,
      password: form.value.password,
    }).subscribe(
      res => {
        // this.registerData = <RegisterData>{};
        this.userSignedIn$.next(true)
        console.log(res);
      }, error => {
        // this.registerData = <RegisterData>{};
        console.log(error);
      }
    );
  }

  logUserOut(): void {
    this._token.signOut().subscribe(
      res =>   {
        this.userSignedIn$.next(false);
        console.log(res);
      },   
      error =>    console.log(error)
    );
  }

}

