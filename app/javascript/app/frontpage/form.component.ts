import { Component, OnChanges, Input, ViewChild, ElementRef } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { ImageUploadModule } from "angular2-image-upload";
import { FormGroup } from '@angular/forms';
import { FormService } from './services/form.service';
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';

import FormHTML from './templates/form.html';


@Component({
  selector: 'konk-form',
  template: FormHTML,
  providers: [ ImageUploadModule ]
})

export class FormComponent implements OnChanges {
  @Input('new') new_form;
  @Input('form_data') form_data: any;
  @ViewChild('dom_file_field') dom_file_field: ElementRef;
  @ViewChild('image_file') dom_image_file: ElementRef;
  @ViewChild('dom_audio') dom_audio: ElementRef; 

  podcastForm: FormGroup;
  file: File;
  podcast_title: string; 
  duration: number;
  uploading_file_to_aws: boolean = false;
  error_message: string; 
  image_file: File = null;
  dom_image_src: string = undefined;
  successfull_save: boolean = false;
  runned: boolean = false;
  id: number;

  constructor(
    private _podServ: PodcastService,
    private _formServ: FormService,
    private _route: ActivatedRoute
  ) {
    this.podcastForm = this._formServ.podcastForm();
  } 

  ngOnChanges() {
    if(this.form_data) {
      this.podcastForm.patchValue(this.form_data); //From edit.component
    }
  }

  setFile(event, file) {
    this.file = this.getOneFile(event.target.files);
    if(this.file && this.file.name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
      let obUrl = URL.createObjectURL(this.file);
      this.dom_audio.nativeElement.setAttribute('src', obUrl);
    }
  }

  getDomDuration(dur: number): {minutes: number, seconds: number}  {
    let minutes = Math.floor(dur / 60);
    let rest_seconds = dur - (minutes * 60);
    return { minutes: minutes, seconds: rest_seconds }
  }

  setDuration(load_event): void { //Is called on <audio> by canplaythrough
    this.duration = Math.round(load_event.currentTarget.duration);
  }

  setImageFile(event) {
    this.image_file = this.getOneFile(event.target.files);
    if(this.image_file) {
      const file_reader = new FileReader();
      file_reader.readAsDataURL(this.image_file);
      file_reader.onload = (e: any) => {
        this.podcastForm.get('icon').setValue(file_reader.result);
        this.dom_image_src = file_reader.result;
      }
    }
  }

  removeImage(event) {
    this.dom_image_src = null;
    this.dom_file_field.nativeElement.value = '';
    this.podcastForm.get('icon').setValue(null);
  }

  getOneFile(files: FileList): File {
    return files.length > 0 ? files[0] : null; 
  }

  podcastNewSubmit(group: FormGroup) {
    var file = this.file;
    let audios = group.get("audios_attributes.0");
    if(audios.value) {
      [audios.value.size, audios.value.title, audios.value.mimeType, audios.value.duration] = 
                              [this.file.size, this.file.name, this.file.type, this.duration];
    }
    this._podServ.savePodcast(group.value).subscribe(
      res => { 
        let presigned_url = res.presigned_url;
        this.uploading_file_to_aws = true;
        this._podServ.uploadToS3(file, presigned_url).subscribe(
          aws_res => { 
            this.uploading_file_to_aws = false;
          } 
        )
      },
      err => {
        this.error_message = err.json().errors.title[0];
        console.log(err);
      }
    )
  }

  podcastEditSubmit(group: FormGroup) {
    var file = this.file;
    let audios = group.get("audios_attributes.0");
    if(audios.value) {
      [audios.value.size, audios.value.title, audios.value.mimeType, audios.value.duration] = 
                              [this.file.size, this.file.name, this.file.type, this.duration];
    }
    let podcast_id = this._route.snapshot.params.id;
    this._podServ.updatePodcast(podcast_id, group.value).subscribe(
      res => { 
        let presigned_url = res.presigned_url;
        this.uploading_file_to_aws = true;
        this._podServ.uploadToS3(file, presigned_url).subscribe(
          aws_res => { 
            this.uploading_file_to_aws = false;
          } 
        )
      },
      err => {
        this.error_message = err.json().errors.title[0];
        console.log(err);
      }
    )
  }


}
