import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Injectable()

export class FormService {
  
  constructor(
    private _fb: FormBuilder
  ){}
  
  podcastForm() {
    return this._fb.group({
      title: [""],
      subtitle: [""],
      summary: [""],
      publicationDate: [""],
      icon: null,
      poster: [""],
      audios_attributes: this._fb.array([
        this.initPodcastAudio()
      ]) 
    })
  }

  initPodcastAudio(): FormGroup {
    return this._fb.group({
      title: [""],
      mimeType: [""],
      size: [""],
      duration: [""]
    })
  }

}
