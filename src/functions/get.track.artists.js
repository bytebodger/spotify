import { allow } from '../classes/allow';

export const getTrackArtistNames = (track = {}) => {
   allow.aPopulatedObject(track);
   const { artists } = track;
   return artists.map(artist => artist.name).join(', ');
}