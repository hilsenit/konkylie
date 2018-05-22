import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
