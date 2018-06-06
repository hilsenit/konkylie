import { Router } from '@angular/router';
import { Component, ContentChild, OnInit, Input, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import { CustomFunctionService } from './services/custom.service';
import { ShowPodcastComponent } from './show_podcast.component';
import FrontpageHTML from './templates/frontpage.html';
import ShellImage from '../../images/shell.png';
import './styles/frontpage.component.sass';

@Component({
  selector: 'konk-frontpage',
  template: FrontpageHTML
})

export class FrontpageComponent implements OnInit {
  @ContentChild(ShowPodcastComponent) modal: ShowPodcastComponent; 
  @ViewChildren('dom_podcasts') dom_podcasts: QueryList<ElementRef>;
  @ViewChild('audio') audio: ElementRef;
  @Input() logged_in: boolean = false; 
  shell_image: string = ShellImage;
  error_message: string;
  podcasts: Podcast[];
  podcast_data: Podcast = null;

  constructor(
    private _podServ: PodcastService,
    private _router: Router,
    private _cust_func: CustomFunctionService
  ){  }

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => { 
        this.podcasts = res;
      },
      err => this.error_message = "Det var desværre ikke muligt at loade podcasts fra serveren. Prøv igen."
    )
  }

  openModal(podcast_id: number): void {
    debugger;
    this._podServ.getPodcast(podcast_id).subscribe(
      (pod_json) => { this.podcast_data = pod_json },
      console.error,
      () => {
        this.loadPodcast(this.podcast_data.id);
      }
    )
  }

  updatePodcast(id: number): void {
    this._router.navigate(["/edit_podcast", id]);
  }

  showDomDuration(dur: number): string {
    let minutes = Math.floor(dur / 60);
    let rest_seconds = dur - ( minutes * 60 );
    return `${minutes} minutter og ${rest_seconds} sekunder`;
  }

  loadPodcast(pod_i: number): void {
    let podcast = this.podcasts[pod_i];
    let podcast_dom = this.dom_podcasts.toArray()[pod_i].nativeElement;
    // podlovePlayer(podcast_dom, this.returnJSON(podcast));
  }


}
