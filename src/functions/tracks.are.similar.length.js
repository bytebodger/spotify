import { allow } from '../classes/allow';
import { is } from '../objects/is';

export const tracksAreSimilarLength = (track1 = {}, track2 = {}, tolerance = 0) => {
   allow.anObject(track1, is.not.empty).anObject(track2, is.not.empty).anInteger(tolerance, is.not.negative);
   const { duration_ms: track1Duration } = track1;
   const { duration_ms: track2Duration } = track2;
   const track1Seconds = Math.floor(track1Duration / 1000);
   const track2Seconds = Math.floor(track2Duration / 1000);
   return track2Seconds <= track1Seconds + tolerance && track2Seconds >= track1Seconds - tolerance;
}