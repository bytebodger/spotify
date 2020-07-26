import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';

export const getTrackArtistNames = (track = trackModel) => {
   allow.anInstanceOf(track, trackModel);
   return track.artists.map(artist => artist.name).join(', ');
}