import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const getTrackArtistNames = (track = {}) => {
   allow.anObject(track, is.not.empty);
   const { artists } = track;
   return artists.map(artist => artist.name).join(', ');
}