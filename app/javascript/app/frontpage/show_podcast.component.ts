declare var podlovePlayer;
import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';

import showPodcastHTML from './templates/podcast_modal.html';
import './styles/modal.component.sass';

@Component({
  selector: 'konk-podcast-modal',
  template: showPodcastHTML
})

export class ShowPodcastComponent implements OnInit {
  @Input('podcast_data') podcast_data: Podcast = null;
  @ViewChild('podlovePlayer') podlove_player: ElementRef;

  constructor(
    private _podServ: PodcastService
  ){}

  ngOnInit() {
    if(this.podcast_data) {
      this.loadPlayer();
    }
  }

  loadPlayer() {
    let podlove_dom = this.podlove_player.nativeElement;
    podlovePlayer(podlove_dom, this._podServ.returnJSON(this.podcast_data));
  }


}
