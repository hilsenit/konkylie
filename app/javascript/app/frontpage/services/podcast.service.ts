import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { Podcast } from '../models/podcast';
import { map } from "rxjs/operators";

@Injectable()

export class PodcastService {
  headers = new Headers({
    "Content-Type": "application/json"
  })

  constructor(
    private _http: Http
  ) {}

  extractData(res: Response) {
    return res.json();
  }


  getPodcasts(): Observable<Podcast[]> {
    return this._http.get("/podcasts.json").pipe(map(this.extractData));
  }

  savePocast(podcast_params: Podcast): Observable<Podcast> {
    return this._http.post("/podcasts", JSON.stringify(podcast_params), { headers: this.headers })
      .pipe(map(this.extractData))
  }
  

}
