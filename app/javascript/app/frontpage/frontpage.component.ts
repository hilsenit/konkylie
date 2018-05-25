declare var podlovePlayer;
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
  ){  }

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => { 
        this.podcasts = res;
      },
      err => this.error_message = "Det var desværre ikke muligt at loade podcasts fra serveren. Prøv igen."
    )
  }

  setPodcast(pod_i: number): void {
    let json_data = JSON.stringify(this.podcasts[pod_i]);
    let podcast_dom = this.dom_podcasts.toArray()[pod_i].nativeElement;
    podlovePlayer(podcast_dom, this.returnJSON);
  }

  showForm() {
    this.show_form.emit(true);
  }
  
  returnJSON() {
    return {
      title: 'FS171 Invasion!',
      subtitle: 'LAN Planung - Kalender - Bingo - Wikipedia - Akkukalibration - Alte iPads und iPods - Find My Friends - iPhone Music Player - Apple Watch - Kommandozeile - Star Wars - Dante - Internet of Things Security - VPN',
      summary: 'Wir haben eine wie wir finden abwechslungsreiche Sendung produziert, die wir Euch wie immer mit Freude bereitstellen. Während die Live-Hörer Freak-Show-Bingo spielen, greifen wir das Wikipedia-Thema der letzten Sendung auf und liefern auch noch weitere Aspekte des optimalen Star-Wars-Medienkonsums frei Haus. Dazu viel Nerderei rund um die Kommandozeile, eine Einschätzung der Perspektive der Apple Watch, ein Rant über die mangelhafte Security  im Internet of Things (and Buildings) und allerlei anderer Kram.  Roddi setzt dieses Mal aus, sonst Vollbesetzung.',
      publicationDate: '2016-02-11T03:13:55+00:00',
      poster: 'https://freakshow.fm/wp-content/cache/podlove/04/662a9d4edcf77ea2abe3c74681f509/freak-show_200x200.jpg',
      show: {
          title: 'Freak Show',
          subtitle: 'Menschen! Technik! Sensationen!',
          summary: 'Die muntere Talk Show um Leben mit Technik, das Netz und Technikkultur. Bisweilen Apple-lastig aber selten einseitig. Wir leben und lieben Technologie und reden darüber. Mit Tim, hukl, roddi, Clemens und Denis. Freak Show hieß irgendwann mal mobileMacs.',
          poster: 'https://freakshow.fm/wp-content/cache/podlove/04/662a9d4edcf77ea2abe3c74681f509/freak-show_200x200.jpg',
          url: 'https://freakshow.fm'
      },
      duration: '04:15:32',
      chapters: [
          { start:"00:00:00", title: 'Intro'},
          { start:"00:01:39", title: 'Begrüßung'},
          { start:"00:04:58", title: 'IETF Meeting Netzwerk'},
      ],
      audio: [{
        url: 'http://freakshow.fm/podlove/file/4468/s/download/c/select-show/fs171-invasion.m4a',
        mimeType: 'audio/mp4',
        size: 93260000,
        title: 'Audio MP4'
      }]
    }
  }

}
