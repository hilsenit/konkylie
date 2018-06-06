import { Component } from '@angular/core'; 

import NewHTML from './templates/new.html';
import "./styles/form.component.sass";

@Component({
  selector: 'konk-podcast-form',
  template: NewHTML,
})

export class NewPodcastComponent {
  new: boolean = true;

}
