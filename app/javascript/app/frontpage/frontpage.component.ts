declare var podlovePlayer;
import { Router } from '@angular/router';
import { Component, Inject, OnInit, Output, Input, EventEmitter, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core'; 
import { PodcastService } from './services/podcast.service';
import { Podcast } from './models/podcast';
import FrontpageHTML from './templates/frontpage.html';
import ShellImage from '../../images/shell.png';
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
  shell_image: string = ShellImage;
  error_message: string;
  podcasts: Podcast[];

  constructor(
    private _podServ: PodcastService,
    private _router: Router
  ){  }

  ngOnInit() {
    this._podServ.getPodcasts().subscribe(
      res => { 
        this.podcasts = res;
      },
      err => this.error_message = "Det var desværre ikke muligt at loade podcasts fra serveren. Prøv igen."
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

  setPodcast(pod_i: number): void {
    let podcast = this.podcasts[pod_i];
    let podcast_dom = this.dom_podcasts.toArray()[pod_i].nativeElement;
    podlovePlayer(podcast_dom, this.returnJSON(podcast));
  }

  showForm() {
    this.show_form.emit(true);
  }

  setPodloveDuration(dur: number): string { // Nogenlunde midlertidigt
    let minutes = Math.floor(dur / 60);
    let rest_seconds = dur - (60 * minutes);
    return `00:${minutes}:${rest_seconds}`;
  }
  
  returnJSON(podcast: Podcast): any {
      return {
        title: podcast.title,
        subtitle: podcast.subtitle,
        summary: podcast.summary,
        publicationDate: podcast.publicationDate,
        duration: this.setPodloveDuration(podcast.audios[0].duration),
        // Mangler!
        // poster: 'https://freakshow.fm/wp-content/cache/podlove/04/662a9d4edcf77ea2abe3c74681f509/freak-show_200x200.jpg',
        // show: {
        //     title: 'Freak Show',
        //     subtitle: 'Menschen! Technik! Sensationen!',
        //     summary: 'Die muntere Talk Show um Leben mit Technik, das Netz und Technikkultur. Bisweilen Apple-lastig aber selten einseitig. Wir leben und lieben Technologie und reden darüber. Mit Tim, hukl, roddi, Clemens und Denis. Freak Show hieß irgendwann mal mobileMacs.',
        //     poster: 'https://freakshow.fm/wp-content/cache/podlove/04/662a9d4edcf77ea2abe3c74681f509/freak-show_200x200.jpg',
        //     url: 'https://freakshow.fm'
        // },
        // chapters: [
        //     { start:"00:00:00", title: 'Intro'},
        //     { start:"00:01:39", title: 'Begrüßung'},
        //     { start:"00:04:58", title: 'IETF Meeting Netzwerk'},
        //     { start:"00:18:37", title: 'Kalender'},
        //     { start:"00:33:40", title: 'Freak Show Bingo'},
        //     { start:"00:35:37", title: 'Wikipedia'},
        //     { start:"01:17:26", title: 'iPhone Akkukalibration'},
        //     { start:"01:24:55", title: 'Alte iPads und iPod touches'},
        //     { start:"01:31:02", title: 'Find My Friends'},
        //     { start:"01:41:46", title: 'iPhone Music Player'},
        //     { start:"01:56:13", title: 'Apple Watch'},
        //     { start:"02:11:51", title: 'Kommandozeile: System Appreciation'},
        //     { start:"02:23:10", title: 'Sound und Design für Games'},
        //     { start:"02:24:59", title: 'Kommandozeile: Remote Deployment'},
        //     { start:"02:32:37", title: 'Kommandozeile: Man Pages'},
        //     { start:"02:44:31", title: 'Kommandozeile: screen vs. tmux'},
        //     { start:"02:58:02", title: 'Star Wars: Machete Order & Phantom Edit'},
        //     { start:"03:20:05", title: 'Kopfhörer-Ersatzteile'},
        //     { start:"03:23:39", title: 'Dante'},
        //     { start:"03:38:03", title: 'Dante Via'},
        //     { start:"03:45:33", title: 'Internet of Things Security'},
        //     { start:"03:56:11", title: 'That One Privacy Guy\'s VPN Comparison Chart'},
        //     { start:"04:10:00", title: 'Ausklang'}
        // ],
        audio: [{
          url: podcast.audios[0].url,
          mimeType: podcast.audios[0].mimeType,
          size: podcast.audios[0].size,
          title: podcast.audios[0].title
        }] 
    }
  }

}
