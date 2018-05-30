import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { FormComponent } from './form.component';
import { FrontpageComponent } from './frontpage.component';

const appRoutes: Routes = [
  { path: 'create_podcast', component: FormComponent },
  { path: 'edit_podcast/:id', component: FormComponent },
  { path: '', component: FrontpageComponent }
]



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [
    AppComponent,
    UserComponent,
    FormComponent,
    FrontpageComponent
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
