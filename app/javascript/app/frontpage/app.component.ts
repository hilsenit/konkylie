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
  output: any;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  constructor(
    private _tokenService: Angular2TokenService,
    private _fb: FormBuilder
  ) {
    this._tokenService.init();
    this.loginForm = _fb.group({
      "email": [""],
      "password": [""]
    })
    this.email = this.loginForm.controls["email"];
    this.password = this.loginForm.controls["password"];
  }

  onSubmit(control: FormControl): void { //hvorfor FormControl?
    debugger;
    this.output = null;
    this._tokenService.registerAccount({
      email: control.value.email,
      password: control.value.password,
      passwordConfirmation: control.value.password
    }).subscribe(
      res => {
        // this.registerData = <RegisterData>{};
        this.output       = res;
        debugger;
      }, error => {
        // this.registerData = <RegisterData>{};
        this.output       = error;
        debugger;
      }
    );
  }
}
