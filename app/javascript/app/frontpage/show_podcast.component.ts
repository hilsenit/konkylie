import { Component, Input } from '@angular/core';
import { Podcast } from './models/podcast';
import showPodcastHTML from './templates/podcast_modal.html';
import './styles/modal.component.sass';

@Component({
  selector: 'konk-podcast-modal',
  template: showPodcastHTML
})

export class ShowPodcastComponent {
  @Input('podcast_data') podcast_data: Podcast
}
