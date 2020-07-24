import { allow } from '../classes/allow';

export const tracksAreSimilarLength = (track1 = {}, track2 = {}, tolerance = 0) => {
   allow.aPopulatedObject(track1).aPopulatedObject(track2).aNonNegativeInteger(tolerance);
   const { duration_ms: track1Duration } = track1;
   const { duration_ms: track2Duration } = track2;
   const track1Seconds = Math.floor(track1Duration / 1000);
   const track2Seconds = Math.floor(track2Duration / 1000);
   return track2Seconds <= track1Seconds + tolerance && track2Seconds >= track1Seconds - tolerance;
}