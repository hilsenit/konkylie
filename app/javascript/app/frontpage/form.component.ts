import { Component } from '@angular/core'; 
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'podcast-form',
  template: FormHTML
})

export class FormComponent {
  podcastForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) {
    this.podcastForm = _fb.group({
      title: [""],
      subtitle: [""],
      summary: [""],
      publicationDate: [""],
      poster: [""],
      audios: this._fb.array([
        this.initAudio(),
      ]) 
    });
  }

  initAudio() {
    return this._fb.group({
      title: [""],
      url: [""],
      mimeType: [""]
    })
  }

  addAudio() {
    const control = <FormArray>this.podcastForm.controls["audios"];
    control.push(this.initAudio());
  }
   
  removeAudio(i: number) {
    const control = <FormArray>this.podcastForm.controls["audios"];
    control.removeAt(i);
  }

  podcastSubmit(control: FormControl): void {
    debugger;
    console.log("HEJ");
  }

}
