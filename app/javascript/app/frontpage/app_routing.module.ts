import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { NewPodcastComponent } from './new_podcast.component';
import { EditPodcastComponent } from './edit_podcast.component';
import { FrontpageComponent } from './frontpage.component';


const routes: Routes = [
  { path: 'create_podcast', component: NewPodcastComponent },
  { path: 'edit_podcast/:id', component: EditPodcastComponent },
  { path: '', component: FrontpageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{ }
