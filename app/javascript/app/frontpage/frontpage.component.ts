import { Component, OnInit } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import FrontpageHTML from './templates/frontpage.html';
import './styles/frontpage.component.sass';

@Component({
  selector: 'konk-frontpage',
  template: FrontpageHTML
})

export class FrontpageComponent implements OnInit {
  error_message: string;
  podcasts: Podcast[];
  constructor( private _podServ: PodcastService ){}

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => {
        this.podcasts = res;
        var hey_podcasts = this.podcasts;
        debugger; 
      },
      err => this.error_message = "Det var desværre ikke muligt at loade podcast fra serveren"
    )
  }

}
