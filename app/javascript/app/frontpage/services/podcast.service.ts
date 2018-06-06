import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { Podcast } from '../models/podcast';
import { map } from "rxjs/operators";

@Injectable()

export class PodcastService {

  constructor(
    private _http: Http
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

}
