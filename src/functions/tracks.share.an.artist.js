import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';

export const tracksShareAnArtist = (track1 = trackModel, track2 = trackModel) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel);
   const { artists: artists1 } = track1;
   const { artists: artists2 } = track2;
   let matchFound = false;
   artists1.forEach(artist1 => {
      artists2.forEach(artist2 => {
         if (artist1.id === artist2.id || artist1.name.toLowerCase() === artist2.name.toLowerCase())
            matchFound = true;
      });
   });
   return matchFound;
}