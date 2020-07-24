import { allow } from '../classes/allow';

export const tracksHaveSimilarNames = (track1 = {}, track2 = {}) => {
   allow.aPopulatedObject(track1).aPopulatedObject(track2);
   const track1Name = track1.name.toLowerCase();
   const track2Name = track2.name.toLowerCase();
   return track1Name.indexOf(track2Name) === 0 || track2Name.indexOf(track1Name) === 0;
}