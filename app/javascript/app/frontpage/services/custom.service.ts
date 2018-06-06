import { Injectable } from '@angular/core';

@Injectable()

export class CustomFunctionService {
  
  setPodloveDuration(dur: number): string { // Nogenlunde midlertidigt, kan ikke regne timer
    let minutes = Math.floor(dur / 60);
    let rest_seconds = dur - (60 * minutes);
    return `00:${minutes}:${rest_seconds}`;
  }
}
