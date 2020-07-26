import { allow } from '../classes/allow';
import { trackModel } from '../objects/models/track.model';

export const tracksHaveSimilarNames = (track1 = trackModel, track2 = trackModel) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel);
   const track1Name = track1.name.toLowerCase();
   const track2Name = track2.name.toLowerCase();
   return track1Name.indexOf(track2Name) === 0 || track2Name.indexOf(track1Name) === 0;
}