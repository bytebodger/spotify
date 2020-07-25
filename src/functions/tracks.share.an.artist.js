import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const tracksShareAnArtist = (track1 = {}, track2 = {}) => {
   allow.anObject(track1, is.not.empty).anObject(track2, is.not.empty);
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