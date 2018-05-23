import { Component } from '@angular/core'; 
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'form',
  template: FormHTML
})

export class FormComponent {
  podcastForm: FormGroup;
  hey: string = "hey";

  constructor(
    private _fb: FormBuilder,
    private _podServ: PodcastService
  ) {
    // this.podcastForm = _fb.group({
    //   "title": [""],
    //   "subtitle": [""],
    //   "summary": [""],
    //   "publicationDate": [""],
    //   "poster": [""],
    //   "show": {
    //     "title": [""],
    //     "subtitle": [""],
    //     "summary": [""],
    //     "poster": [""],
    //     "url": [""],
    //   },
    // })
  }

  savePodcast(control: FormControl): void {
    console.log("HEJ");
  }

}
