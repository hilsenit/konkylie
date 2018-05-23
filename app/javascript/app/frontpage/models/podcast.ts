import { Audio } from './audio';
export class Podcast {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  publicationDate: string;
  poster: string;
  duration: string;
  audios: Audio[]
}
