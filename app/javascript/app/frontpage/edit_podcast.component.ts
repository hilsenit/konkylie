import { Component, OnInit } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Podcast } from './models/podcast';

import EditHTML from './templates/edit.html';
import "./styles/form.component.sass";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'konk-podcast-form',
  template: EditHTML
})

export class EditPodcastComponent implements OnInit {
  formData: any;
  new: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _podServ: PodcastService
  ){}

  ngOnInit() {
    let param_id = this._route.snapshot.params.id
    this._podServ.getPodcast(+param_id).subscribe(
    (res_json) => { 
      this.formData = res_json;
    })
  }
}
