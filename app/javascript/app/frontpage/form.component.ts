import { Component } from '@angular/core'; 
import { Validator, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service';
import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'konk-podcast-form',
  template: FormHTML
})

export class FormComponent {
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
      audios: this._fb.array([
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

  podcastSubmit(group: any): void {
    this._podServ.savePocast(group).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
