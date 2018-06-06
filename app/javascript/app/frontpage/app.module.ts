import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ImageUploadModule } from "angular2-image-upload";

import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './services/auth.service';
import { PodcastService } from './services/podcast.service';
import { FormService } from './services/form.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { FrontpageComponent } from './frontpage.component';

import { NewPodcastComponent } from './new_podcast.component';
import { EditPodcastComponent } from './edit_podcast.component';
import { FormComponent } from './form.component';

import { AppRoutingModule } from './app_routing.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    FormComponent,
    FrontpageComponent,
    EditPodcastComponent,
    NewPodcastComponent
  ],
  providers: [
    Angular2TokenService,
    AuthService,
    PodcastService,
    FormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
