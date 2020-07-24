import { allow } from '../classes/allow';

export const tracksHaveIdenticalNames = (track1 = {}, track2 = {}) => {
   allow.aPopulatedObject(track1).aPopulatedObject(track2);
   return track1.name.toLowerCase() === track2.name.toLowerCase();
}