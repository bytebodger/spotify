import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';

export const tracksShareAnArtist = (track1 = trackModel, track2 = trackModel) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel);
   let matchFound = false;
   track1.artists.forEach(track1Artist => {
      track2.artists.forEach(track2Artist => {
         if (track1Artist.id === track2Artist.id || track1Artist.name.toLowerCase() === track2Artist.name.toLowerCase())
            matchFound = true;
      });
   });
   return matchFound;
}