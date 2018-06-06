import { Component, AfterViewChecked, Output, EventEmitter, ViewChild, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core'; 
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ImageUploadModule } from "angular2-image-upload";
import { Http } from '@angular/http';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service';
import { FormService } from './services/form.service';
import { Podcast } from './models/podcast';


import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'konk-podcast-form',
  template: FormHTML,
  providers: [ ImageUploadModule ]
    
})

export class FormComponent implements OnInit {
  @Output() show_form = new EventEmitter();
  @ViewChild('dom_file_field') dom_file_field: ElementRef;
  @ViewChild('image_file') dom_image_file: ElementRef;
  @ViewChild('dom_audio') dom_audio: ElementRef; 
  uploading_file_to_aws: boolean = false;
  file: File;
  successfull_save: boolean = false;
  error_message: string; 
  podcast_title: string; 
  podcastForm: FormGroup;
  duration: number;
  image_file: File = null;
  dom_image_src: string = undefined;

  constructor(
    private _podServ: PodcastService,
    private _formServ: FormService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
  } 

  ngOnInit() {
    this.podcastForm = this._formServ.podcastForm(); 
    this._route.params.subscribe((params: Params) => { 
      if (!params.value) {
        console.log("CREATE - NEW FORM");
        return; 
      } else {
        this._route.params.switchMap((params: Params): any => {
          this._podServ.getPodcast(+params['id']);
        })
        .subscribe((podcast_json) => {
            console.log("EDIT - SET FORM");
            debugger;
            // if (podcast_json.icon.url) { this.dom_image_src = podcast_json.icon.url };
            // this.podcastForm.patchValue(podcast_json);
          },
          (err) => console.log(err)
        )
      }
    })
  }

  setFile(event, file) {
    this.file = this.getOneFile(event.target.files);
    if(this.file && this.file.name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
      let obUrl = URL.createObjectURL(this.file);
      this.dom_audio.nativeElement.setAttribute('src', obUrl);
    }
  }

  showFrontpage() {
    this.show_form.emit(false) 
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

  podcastSubmit(group: FormGroup) {
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
            this.show_form.emit(false); // Remove form and show frontpage
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
