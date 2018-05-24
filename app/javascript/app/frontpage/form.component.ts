import { Component } from '@angular/core'; 
import { Http } from '@angular/http';
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
  var file = this.file; // Couldn't be find in the subscribe
    let audios = group.get("audios_attributes.0");
    [audios.value.size, audios.value.title, audios.value.mimeType] = [this.file.size, this.file.name, this.file.type];
    console.log("Before saving - form values: " + group.value);
    this._podServ.savePodcast(group.value).subscribe(
      res => { 
        let presigned_url = res.audios[0].url;
        this._podServ.uploadToS3(file, presigned_url).subscribe(
          aws_res => { debugger; console.log(aws_res) }, 
          aws_err => console.log(aws_err)
        )
        this.successfull_save = true;
        this.podcast_title = res.title;
      },
      err => {
        this.error_message = err.json().errors.title[0];
        console.log(err);
      }
    )
  }


}
