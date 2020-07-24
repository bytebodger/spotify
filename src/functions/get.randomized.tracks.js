import { use } from '../objects/use';

export const getRandomizedTracks = () => {
   let tracks = [...use.playlistsEndpoint.tracks];
   for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = tracks[i];
      tracks[i] = tracks[j];
      tracks[j] = temp;
   }
   return tracks;
}