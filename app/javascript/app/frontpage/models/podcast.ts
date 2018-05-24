import { Audio } from './audio';

export class Podcast {
  id?: number; //Is not present on new
  status: number;
  presigned_url: string;
  title: string;
  subtitle: string;
  summary: string;
  publicationDate: string;
  poster: string;
  duration: string;
  audios: Audio[]
}
