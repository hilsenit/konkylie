import { Component, Inject, OnInit, Output, Input, EventEmitter, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import FrontpageHTML from './templates/frontpage.html';
import './styles/frontpage.component.sass';

@Component({
  selector: 'konk-frontpage',
  template: FrontpageHTML
})

export class FrontpageComponent implements OnInit {
  @ViewChildren('dom_podcasts') dom_podcasts: QueryList<ElementRef>;
  @ViewChild('audio') audio: ElementRef;
  @Input() logged_in: boolean = false; 
  @Output() show_form = new EventEmitter();
  error_message: string;
  podcasts: Podcast[];

  constructor(
    private _podServ: PodcastService,
    @Inject("Window") private my_window: Window // For podlovePlayer script
  ){  }

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => { 
        this.podcasts = res;
      },
      err => this.error_message = "Det var desværre ikke muligt at loade podcasts fra serveren. Prøv igen."
    )
  }

  setPodcast(pod_i: number, aud_url: string): void {
    let podcast = this.dom_podcasts.toArray()[pod_i]
    console.log(podcast)
  }

  showForm() {
    this.show_form.emit(true);
  }

}
