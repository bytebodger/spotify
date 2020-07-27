import { allow } from '../classes/allow';
import { is } from '../objects/is';
import { trackModel } from '../objects/models/track.model';

export const tracksAreSimilarLength = (track1 = trackModel, track2 = trackModel, tolerance = 0) => {
   allow.anInstanceOf(track1, trackModel).anInstanceOf(track2, trackModel).anInteger(tolerance, is.not.negative);
   const track1Seconds = Math.floor(track1.duration_ms / 1000);
   const track2Seconds = Math.floor(track2.duration_ms / 1000);
   return track2Seconds <= track1Seconds + tolerance && track2Seconds >= track1Seconds - tolerance;
}