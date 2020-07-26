import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';

export const tracksHaveIdenticalNames = (track1 = trackModel, track2 = trackModel) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel);
   return track1.name.toLowerCase() === track2.name.toLowerCase();
}