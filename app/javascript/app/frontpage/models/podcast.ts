import { Audio } from './audio';

export class Podcast {
  id?: number; //Is not present on new
  status: number;
  title: string;
  subtitle: string;
  summary: string;
  publicationDate: string;
  poster: string;
  duration: string;
  audios: Audio[]
}
