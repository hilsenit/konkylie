import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import FrontpageHTML from './templates/frontpage.html';
import './styles/frontpage.component.sass';

@Component({
  selector: 'konk-frontpage',
  template: FrontpageHTML
})

export class FrontpageComponent implements OnInit {
  @Input() logged_in: boolean = false; 
  @Output() show_form = new EventEmitter();
  error_message: string;
  podcasts: Podcast[];
  constructor( private _podServ: PodcastService ){}

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => this.podcasts = res,
      err => this.error_message = "Det var desværre ikke muligt at loade podcasts fra serveren. Prøv igen."
    )
  }

  showForm() {
    this.show_form.emit(true);
  }

}
