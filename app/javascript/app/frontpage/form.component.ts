import { Component } from '@angular/core'; 
import { Validators, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service'; import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'konk-podcast-form',
  template: FormHTML
})
export class FormComponent {
  file: File;
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

  setFileField(event) {
    let files: FileList = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      console.log("Bound to file: " + this.file);
    }
  }

  initAudio(): FormGroup {
    return this._fb.group({
      title: [""],
      mimeType: [""],
      size: [""]
    })
  }

  podcastSubmit(group: FormGroup) {
    let audios = group.get("audios_attributes.0");
    [audios.value.size, audios.value.title, audios.value.mimeType] = [this.file.size, this.file.name, this.file.type];
    console.log(group.value);
    this._podServ.savePodcast(group.value).subscribe(
      res => { 
        this.successfull_save = true;
        if (this.file) { 
          this.uploadToS3(res.presigned_url); 
        };
        this.podcast_title = res.title;
        debugger;
      },
      err => {
        this.error_message = err.json().errors.title[0];
        debugger;
        console.log(err);
      }
    )
  }

  uploadToS3(pre_url: string): void {
    console.log("UPLOAD TO S3");
  }

}
