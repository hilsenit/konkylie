import { Component, AfterViewChecked, Output, EventEmitter, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core'; 
import { Http } from '@angular/http';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { PodcastService } from './services/podcast.service';
import { FormService } from './services/form.service';
import FormHTML from './templates/form.html';
import "./styles/form.component.sass";

@Component({
  selector: 'konk-podcast-form',
  template: FormHTML
})

export class FormComponent implements AfterViewChecked  {
  @Output() show_form = new EventEmitter();
  // @ViewChildren('files') dom_files: QueryList<ElementRef>;
  @ViewChild('file') dom_file: ElementRef;
  uploading_file_to_aws: boolean = false;
  file: File;
  successfull_save: boolean = false;
  error_message: string; 
  podcast_title: string; 
  podcastForm: FormGroup;

  constructor(
    private _podServ: PodcastService,
    private _formServ: FormService
  ) { 
    this.podcastForm = _formServ.podcastForm();
  } 

  ngAfterViewChecked() {
    this.dom_file.nativeElement.addEventListener('loadeddata', function() {
      debugger;
    });
  }

  showFrontpage() { this.show_form.emit(false) }

  setFileField(event, file) {
    debugger;
    let files: FileList = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      console.log("Bound to file: " + this.file);
    }
  }

  podcastSubmit(group: FormGroup) {
    var file = this.file;
    let audios = group.get("audios_attributes.0");
    [audios.value.size, audios.value.title, audios.value.mimeType] = 
                        [this.file.size, this.file.name, this.file.type];
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
