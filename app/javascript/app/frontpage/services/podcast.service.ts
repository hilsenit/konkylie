import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  getPodcasts(): Observable<Podcast[]> {
    return this._http.get("/podcasts.json").pipe(map(this.extractData));
  }
  

}
