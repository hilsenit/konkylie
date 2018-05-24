import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';
import { PodcastService } from './services/podcast.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { FormComponent } from './form.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent, UserComponent, FormComponent
  ],
  providers: [Angular2TokenService, AuthService, PodcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
