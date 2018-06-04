import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { FormComponent } from './form.component';
import { FrontpageComponent } from './frontpage.component';


const routes: Routes = [
  { path: 'create_podcast', component: FormComponent },
  { path: 'edit_podcast/:id', component: FormComponent },
  { path: '', component: FrontpageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{ }
