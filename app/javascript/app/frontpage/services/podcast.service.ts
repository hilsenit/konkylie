import { Injectable } from '@angular/core';
import { CustomFunctionService } from './custom.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { Podcast } from '../models/podcast';
import { map } from "rxjs/operators";

@Injectable()

export class PodcastService {

  constructor(
    private _http: Http,
    private _cust_func: CustomFunctionService


  ) {}

  extractData(res: Response) {
    return res.json();
  }

  uploadToS3(file: File, pre_url: string): Observable<any> {
    const headers = new Headers({'Content-Type': 'audio/mp3'});
    const options = new RequestOptions({ headers: headers});
    return this._http.put(pre_url, file, options).pipe(map(
      res => { return res },
      err => console.log(err)
    
    ))
  }

  getPodcasts(): Observable<Podcast[]> {
    return this._http.get("/podcasts.json").pipe(map(this.extractData));
  }

  getPodcast(id: number): Observable<Podcast> {
    return this._http.get(`/podcasts/${id}/edit`).pipe(map(this.extractData));
  }

  savePodcast(podcast_params: Podcast): Observable<Podcast> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = JSON.stringify({"podcast": podcast_params}); // Rails need the parent param "podcast"
    return this._http.post("/podcasts", data, { headers: headers })
      .pipe(map(this.extractData))
  }

  updatePodcast(id: number, podcast_params: Podcast): Observable<Podcast> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = JSON.stringify({"podcast": podcast_params}); // Rails need the parent param "podcast"
    return this._http.patch(`/podcasts/${id}`, data, { headers: headers })
      .pipe(map(this.extractData))
  }

  returnJSON(podcast: Podcast): any {
      return {
        title: podcast.title,
        subtitle: podcast.subtitle,
        summary: podcast.summary,
        publicationDate: podcast.publicationDate,
        duration: this._cust_func.setPodloveDuration(podcast.audios[0].duration),
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
