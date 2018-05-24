import { Component } from '@angular/core'; 
import { Validator, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service'; import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'konk-podcast-form',
  template: FormHTML
})
export class FormComponent {
  successfull_save: boolean = false;
  error_message: string; 
  podcast_title: string;
  podcastForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _podServ: PodcastService
  ) {
    this.podcastForm = _fb.group({
      title: [""],
      subtitle: [""],
      summary: [""],
      publicationDate: [""],
      poster: [""],
      audios_attributes: this._fb.array([
        this.initAudio()
      ]) 
    });
  }

  initAudio(): FormGroup {
    return this._fb.group({
      title: [""],
      url: [""],
      mimeType: [""]
    })
  }

  addAudio() {
    const array_control = <FormArray>this.podcastForm.controls["audios"];
    array_control.push(this.initAudio());
  }
   
  removeAudio(i: number) {
    const array_control = <FormArray>this.podcastForm.controls["audios"];
    array_control.removeAt(i);
  }

  podcastSubmit(group: FormGroup) {
    this._podServ.savePodcast(group.value).subscribe(
      res => { 
        debugger;
        this.successfull_save = true;
        this.podcast_title = res.title;
      },
      err => {
        debugger;
        this.error_message = err.json().errors.title[0];
        console.log(err);
      }
    )
  }

}
